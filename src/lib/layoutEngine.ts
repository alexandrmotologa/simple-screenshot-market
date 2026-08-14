import { Screen, SlideLayout, TextLayer, ScreenshotLayer } from "./types";

export function applyLayoutToScreen(screen: Screen, layout: SlideLayout): Screen {
  const W = screen.width;
  const H = screen.height;
  
  // Find primary text layer and screenshot layer
  const textLayer = screen.layers.find(l => l.type === "text") as TextLayer | undefined;
  const screenshotLayer = screen.layers.find(l => l.type === "screenshot") as ScreenshotLayer | undefined;

  const newLayers = screen.layers.map(layer => {
    if (layer.id === textLayer?.id) {
      const tl = { ...layer } as TextLayer;
      // Calculate new position based on layout
      switch (layout) {
        case "hero":
          tl.width = W * 0.8;
          tl.x = (W - tl.width) / 2;
          tl.y = H * 0.15;
          tl.align = "center";
          break;
        case "device-bottom":
          tl.width = W * 0.8;
          tl.x = (W - tl.width) / 2;
          tl.y = H * 0.1;
          tl.align = "center";
          break;
        case "device-top":
          tl.width = W * 0.8;
          tl.x = (W - tl.width) / 2;
          tl.y = H * 0.8;
          tl.align = "center";
          break;
        case "no-device":
          tl.width = W * 0.8;
          tl.x = (W - tl.width) / 2;
          tl.y = H * 0.4;
          tl.align = "center";
          break;
      }
      return tl;
    }

    if (layer.id === screenshotLayer?.id) {
      const sl = { ...layer } as ScreenshotLayer;
      // Default aspect ratio for a phone if width/height are 0
      const aspect = sl.height > 0 ? sl.width / sl.height : 1290 / 2796;
      
      switch (layout) {
        case "hero":
        case "device-bottom":
          sl.width = W * 0.75;
          sl.height = sl.width / aspect;
          sl.x = (W - sl.width) / 2;
          sl.y = H * 0.35;
          break;
        case "device-top":
          sl.width = W * 0.75;
          sl.height = sl.width / aspect;
          sl.x = (W - sl.width) / 2;
          sl.y = -H * 0.05;
          break;
        case "no-device":
          // Move off-screen or shrink
          sl.x = W + 1000;
          break;
      }
      return sl;
    }

    return layer;
  });

  return {
    ...screen,
    layout,
    layers: newLayers,
  };
}
