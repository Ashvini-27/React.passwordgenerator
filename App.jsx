import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700">
      <div className="w-full max-w-md mx-auto shadow-xl rounded-2xl p-6 bg-gray-800 text-orange-400">
        <h1 className="text-3xl font-bold text-white text-center mb-6">
          Password Generator
        </h1>

        <div className="flex shadow-md rounded-lg overflow-hidden mb-6">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-2 px-3 text-lg bg-gray-900 text-white"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 font-semibold transition-all duration-200"
          >
            Copy
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {/* Slider */}
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={6}
              max={32}
              value={length}
              className="cursor-pointer w-full accent-orange-500"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="text-white font-medium">Length: {length}</label>
          </div>

          {/* Checkboxes */}
          <div className="flex justify-between">
            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={numberAllowed}
                onChange={() => setNumberAllowed((prev) => !prev)}
              />
              Numbers
            </label>

            <label className="flex items-center gap-2 text-white">
              <input
                type="checkbox"
                checked={charAllowed}
                onChange={() => setCharAllowed((prev) => !prev)}
              />
              Special Characters
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
