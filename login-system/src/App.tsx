import Login from "@/components/project/login";

function App() {
  return (
    <div className="w-screen h-screen bg-blue-50 flex items-center">
      <div className="mx-auto w-1/4 h-1/2 min-w-75 min-h-92 bg-white rounded-xl p-8 shadow-2xl">
        <Login />
      </div>
    </div>
  );
}

export default App;
