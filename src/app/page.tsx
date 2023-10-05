"use client";

import { useEffect } from 'react';
import { Socket, io } from "socket.io-client";
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { useRouter } from 'next/navigation';
import useInput from '@/hooks/useInput';

import styles from './page.module.css';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home() {
  const [roomId, RoomIdInput] = useInput({ type: "text" });
  const router = useRouter();

  useEffect(() => {
    socketInitializer();
  }, []);

  const goToRoomAfterEnterRoom = (response: any) => {
    if (response?.action === 'enterRoom' && response?.arg) {
      router.push(`/room/${response?.arg}`);
    }
  };

  const socketInitializer: any = async () => {
    socket = io('http://localhost:8081');

    socket.on('connect', () => {
      console.log('connected');
    });
    socket.on("room::message", (stringResponse) => {
      const response = JSON.parse(stringResponse);
      console.log("room::message", response?.message);

      goToRoomAfterEnterRoom(response);
    });
  }

  const handleJoinRoom = () => {
    if (socket) {
      socket.emit('room::join', roomId);
    }
  }

  return (
    <main className={styles.main}>
      <RoomIdInput />
      <button onClick={handleJoinRoom}>Entrar</button>
    </main>
  )
}
