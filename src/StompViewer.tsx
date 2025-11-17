import React, { useEffect, useRef, useState } from 'react';
import { Client, type IMessage } from '@stomp/stompjs';

import "./StompViewer.css";

interface Message {
  topic: string;
  payload: string;
}

export const StompViewer: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
      const STOMP_URL = import.meta.env.VITE_STOMP_URL!;
      const STOMP_USER = import.meta.env.VITE_STOMP_USER!;
      const STOMP_PASS = import.meta.env.VITE_STOMP_PASS!;

      const STOMP_TOPIC = import.meta.env.VITE_STOMP_TOPIC!;

      console.log('Using STOMP topic:', STOMP_TOPIC);



    const client = new Client({
      brokerURL: STOMP_URL,
      connectHeaders: {
        login: STOMP_USER,
        passcode: STOMP_PASS,
      },
      debug: (str) => {
        console.log(str);
      },
      reconnectDelay: 5000,
    });

    client.onConnect = () => {
      console.log('Connected to STOMP broker');
      client.subscribe(STOMP_TOPIC, (message: IMessage) => {
        const newMsg: Message = {
          topic: STOMP_TOPIC,
          payload: message.body,
        };
        setMessages((prev) => [...prev, newMsg]);
        // Auto-scroll
        if (scrollRef.current) {
          scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
      });
    };

    client.onStompError = (frame) => {
      console.error('Broker reported error: ', frame.headers['message']);
      console.error('Additional details: ', frame.body);
    };

    client.activate();
    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, []);

    return (
        <div className="StompViewer" ref={scrollRef}>
            {messages.map((msg, idx) => (
                <div key={idx} className="StompMessageRow">
                    <div className="StompMessageTopic">{msg.topic}</div>
                    <div className="StompMessagePayload">{msg.payload}</div>
                </div>
            ))}
        </div>
    );
};

