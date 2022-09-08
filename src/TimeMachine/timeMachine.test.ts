import { interpret } from "xstate";
import { timeMachine } from "./timeMachine";

describe("TimeMachine", () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  it("should end in DelayedState", async () => {
    const machine = timeMachine.withConfig({
      services: {
        request: () => {
          return Promise.resolve();
        },
      },
    });
    const service = interpret(machine).start();

    service.send("trigger");

    // THIS is missing piece.
    // We need to allow PromiseJobs queue to be handled
    await Promise.resolve();

    jest.advanceTimersByTime(16000);

    expect(service.state.value).toBe("DelayedState");
  });
});
