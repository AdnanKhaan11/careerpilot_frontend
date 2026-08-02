import { useCallback, useState } from "react";

export default function useTraceStream() {
  const [connected, setConnected] = useState(false);

  const connect = useCallback(() => {
    // TraceStream transport will be connected when the backend exposes one.
    setConnected(false);
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
  }, []);

  return {
    connected,
    connect,
    disconnect,
  };
}
