import "./styles.css";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { createMachine, assign } from "xstate";
import { useMachine } from "@xstate/react";

interface ToggleContext {
  count: number;
}

const toggleMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBcD2UoBswDoCWAdgIYDGyeAbmAMQAqA8gOKMAyAooqAA6qx7moCnEAA9EAWgCMAZgAsOWQAZZAJgAcATkmyAbIsUBWRToA0IAJ4SZGnAbUrF0wzrVrlygL4ezaDNhyk5FR0TKwcSCA8fAJCEWIIUnIKyupauvpGphYSDoo4atLSGhqKGioA7OU6kpJe3iAEqBBwwr5YuISBlGDCUfx4gsLx4k46OHIqRhUa5brS5WaWCdpjivaOOiolarLF5V4+6O0BZN29vP2DcYh6OBoG8+XSKi+79xqLVuWStuuyss9NJtFPt6m1sOdogNYqBhoU8hMpuUZnMFtkEhVpPk5IoVDonHZZJIVNI6h4gA */
  createMachine<ToggleContext>({
    context: { count: 0 },
    id: "toggle",
    initial: "inactive",
    states: {
      inactive: {
        on: {
          TOGGLE: {
            target: "active",
          },
        },
      },
      active: {
        entry: assign({ count: (ctx) => ctx.count + 1 }),
        on: {
          TOGGLE: {
            target: "inactive",
          },
        },
      },
    },
  });

function App() {
  const [current, send] = useMachine(toggleMachine);
  const active = current.matches("active");
  const { count } = current.context;

  return (
    <div className="App">
      <h1>XState React Template</h1>
      <h2>Fork this template!</h2>
      <button onClick={() => send("TOGGLE")}>
        Click me ({active ? "✅" : "❌"})
      </button>{" "}
      <code>
        Toggled <strong>{count}</strong> times
      </code>
      <pre style={{ textAlign: "left" }}>
        {JSON.stringify(current, null, 2)}
      </pre>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
