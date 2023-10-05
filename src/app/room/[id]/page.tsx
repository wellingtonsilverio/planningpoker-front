"use client";

import { useEffect } from 'react';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';

import styles from './page.module.css';

let socket: Socket<DefaultEventsMap, DefaultEventsMap>;

export default function Home({ params }: { params: { id: string } }) {
  useEffect(() => {
    socketInitializer();
  }, []);

  const socketInitializer = () => {
    socket = io('http://localhost:8081');
    
    socket.on("clients::update", (stringRoom) => {
      const room = JSON.parse(stringRoom);
      console.log("room", room);
    });
  }

  return (
    <main className={styles.main}>
      {params?.id}
    </main>
  )
}
