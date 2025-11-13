// AppOnline.tsx
import React, { useState, useEffect, useCallback } from "react";
import { View, Text, Button, StyleSheet, ActivityIndicator } from "react-native";
import Board from "./components/Board";
import {
    registerDevice,
    createOrJoinMatch,
    getWaitingStatus,
    getMatchState,
    makeMove,
} from "./services/api";


export default function AppOnline() {
    const [deviceId, setDeviceId] = useState<string | null>(null);
    const [matchId, setMatchId] = useState<string | null>(null);
    const [board, setBoard] = useState<string[][]>([]);
    const [turn, setTurn] = useState<string | null>(null);
    const [winner, setWinner] = useState<string | null>(null);
    const [players, setPlayers] = useState<Record<string, string> | null>(null);
    const [loading, setLoading] = useState(true);
    const [waiting, setWaiting] = useState(false);

    // === 1️⃣ Registro del jugador ===
    useEffect(() => {
        (async () => {
            const { device_id } = await registerDevice(`Jugador-${Math.floor(Math.random() * 1000)}`);
            setDeviceId(device_id);
        })();
    }, []);

    // === 2️⃣ Crear o unirse a partida ===
    useEffect(() => {
        if (!deviceId) return;
        (async () => {
            const res = await createOrJoinMatch(deviceId, 3);
            if (res.status === 202) {
                setWaiting(true);
            } else if (res.status === 201) {
                setMatchId(res.data.match_id);
                setPlayers(res.data.players);
            }
            setLoading(false);
        })();
    }, [deviceId]);

    // === 3️⃣ Polling: revisar si ya hay partida o cambios ===
    useEffect(() => {
        if (!deviceId) return;

        const interval = setInterval(async () => {
            if (waiting) {
                const status = await getWaitingStatus(deviceId);
                if (status.status === "matched") {
                    setMatchId(status.match_id);
                    setPlayers(status.players);
                    setWaiting(false);
                }
            } else if (matchId) {
                const state = await getMatchState(matchId);
                setBoard(state.board);
                setTurn(state.turn);
                setWinner(state.winner);
                setPlayers(state.players);
            }
        }, 1500);

        return () => clearInterval(interval);
    }, [deviceId, matchId, waiting]);

    // === 4️⃣ Hacer movimiento ===
    const handlePressSquare = useCallback(
        async (index: number) => {
            if (!matchId || !deviceId || !turn || winner) return;
            if (turn !== deviceId) return; // No es tu turno

            const size = board.length;
            const x = Math.floor(index / size);
            const y = index % size;

            const updated = await makeMove(matchId, deviceId, x, y);
            setBoard(updated.board);
            setWinner(updated.winner);
            setTurn(updated.next_turn);
        },
        [board, deviceId, matchId, turn, winner]
    );

    if (loading) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <Text>Conectando...</Text>
            </View>
        );
    }

    if (waiting) {
        return (
            <View style={styles.container}>
                <Text>Esperando oponente...</Text>
            </View>
        );
    }

    if (!matchId) {
        return (
            <View style={styles.container}>
                <Text>No se pudo crear partida.</Text>
            </View>
        );
    }

    const mySymbol = players ? players[deviceId!] : "?";
    const oppSymbol = players
        ? Object.values(players).find((s) => s !== mySymbol)
        : "?";

    return (
        <View style={styles.container}>
            <Text style={styles.turnText}>
                {winner
                    ? winner === "Draw"
                        ? "Empate 😐"
                        : `Ganó ${winner}`
                    : turn === deviceId
                        ? `Tu turno (${mySymbol})`
                        : `Turno de oponente (${oppSymbol})`}
            </Text>

            <Board
                board={board.flat()} // tu Board usa un array 1D
                onPressSquare={handlePressSquare}
            />

            <Button title="Actualizar" onPress={async () => matchId && setBoard((await getMatchState(matchId)).board)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    turnText: {
        fontSize: 20,
        marginBottom: 16,
    },
});
