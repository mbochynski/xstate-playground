import { createMachine } from "xstate";

const timeMachine =
  /** @xstate-layout N4IgpgJg5mDOIC5QBUCWBbMBZAhgYwAtUA7MAOgEljUAXVHAGwGUacawBiGgJ1Shm6JQABwD2sWqlHEhIAB6IATAHYyAFgCcABkVq9axQDYArGsMGANCACeiALQBGLaoAcyw8qPKtLxS4dqxgC+QVZomLiEJOQASmAAjgCucDQAwqLowgxg7CxsnHKwrOxkOABm7NwAFA7GWvUAlBzh2PhEpGRxSSnpmdm5xWCyYhJ00rIKCADMGi5kDoYaCwaGfi6rVrYIimRTZmpT5h6L3i4aIWEYrVEdXclFeewcENLkJABuogDW5C2R7bEEvcaI8wAgPqI8GwpMQANpaAC6w3EknGSHkiAcyg0ZBcaixUz8e28imMU02Sl2+0OZncGlO5wuIGIoggcFkfza0Uo1DojFByNGMIm9gcUymZBUxicahcWgcvg05JsosUDjIq18+LxhgVDg0hiZnJu5AAImAGDhrJABeiRqiZOjJsZFDi5cZDOKDLN9YoKQhHOKyKY9hoXe4tIbQiBjQDOkCehksjkwLaRCixo7QJMpsY5rVlAcvFMCWp-XL5oXfMZZksXFMzkarv9uXcUmmQPbMyKEAstJLPbrCSWnLnlVtAzipu5lPr6X5pR4mxEuaRBQ6e45jKopTK5QrXeP7Gr1dOPFN6mrCaTFCEQkA */
  createMachine({
    predictableActionArguments: true,
    id: "TimeMachine",
    initial: "InitialState",
    states: {
      InitialState: {
        on: {
          trigger: {
            target: "RequestState",
          },
        },
      },
      DelayedState: {},
      RequestCompleteState: {
        after: {
          "15000": {
            target: "DelayedState",
          },
        },
      },
      RequestState: {
        invoke: {
          src: "request",
          onDone: [
            {
              target: "RequestCompleteState",
            },
          ],
        },
      },
    },
  });

export { timeMachine };
