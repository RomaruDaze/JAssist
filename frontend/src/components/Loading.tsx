interface LoadingProps {
  message?: string;
}

const Loading = ({ message = "Loading..." }: LoadingProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
      }}
    >
      <div
        style={{
          border: "4px solid #0ea5e9",
          borderRadius: "50%",
          width: 48,
          height: 48,
          borderTop: "4px solid transparent",
          animation: "spin 1s linear infinite",
        }}
      />
      <p style={{ marginTop: 16, fontSize: 18, color: "#ccc" }}>{message}</p>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loading;
