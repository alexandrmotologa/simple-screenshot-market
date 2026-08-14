import { task } from "@trigger.dev/sdk/v3";

export const helloWorldTask = task({
  id: "hello-world",
  // Set an optional maxDuration to prevent tasks from running indefinitely
  maxDuration: 300,
  run: async (payload: any, { ctx }) => {
    console.log("Hello from Trigger.dev!");
    console.log("Payload:", payload);
    
    return {
      message: "Hello world!",
    };
  },
});
