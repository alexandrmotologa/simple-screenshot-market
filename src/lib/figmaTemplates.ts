import { Layer } from "./types";

export interface FigmaMockupData {
  x: number;
  y: number;
  width: number;
  height: number;
  transform: string | null;
}

export interface FigmaGradientStop {
  color: string;
  position: number;
}

export interface FigmaBackground {
  type: "solid" | "gradient";
  color?: string;
  gradient?: {
    direction: string;
    stops: FigmaGradientStop[];
  };
}

export interface FigmaScreenData {
  screenIndex: number;
  mockups: FigmaMockupData[];
  layers: Layer[];
  background: FigmaBackground;
}

export interface FigmaTemplate {
  id: string;
  name: string;
  background: FigmaBackground;
  screens: FigmaScreenData[];
}

export const FIGMA_TEMPLATES: FigmaTemplate[] = [
  {
    "id": "figma_1",
    "name": "Template 1",
    "background": {
      "type": "solid",
      "color": "#047855"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 174.0,
            "y": 1091.0,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6869",
            "type": "text",
            "x": 100.65,
            "y": 403.6,
            "width": 984.34,
            "height": 462.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_1",
            "type": "image",
            "x": 100.0,
            "y": 100.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 176.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6870",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047855"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 178.84,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6874",
            "type": "text",
            "x": 208.0,
            "y": 2116.63,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_1_194_6876",
            "type": "text",
            "x": 145.0,
            "y": 2406.0,
            "width": 1000.0,
            "height": 140.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_1_194_6878",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 62.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047855"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 181.16,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6872",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 345.0,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.0,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6880",
            "type": "text",
            "x": 112.25,
            "y": 181.17,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_1_194_6881",
            "type": "text",
            "x": 112.25,
            "y": 471.03,
            "width": 992.39,
            "height": 140.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 188.12,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 190.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6871",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047855"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 192.76,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6875",
            "type": "text",
            "x": 208.0,
            "y": 379.44,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_1_194_6877",
            "type": "text",
            "x": 145.0,
            "y": 669.0,
            "width": 1000.0,
            "height": 140.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_1_194_6879",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 62.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047855"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 195.08,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_1_194_6873",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 228.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.1,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047855"
        }
      }
    ]
  },
  {
    "id": "figma_2",
    "name": "Template 2",
    "background": {
      "type": "solid",
      "color": "#005495"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 546.6,
            "y": 115.74,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6836",
            "type": "text",
            "x": 153.37,
            "y": 686.42,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_2_194_6839",
            "type": "text",
            "x": 128.37,
            "y": 1181.53,
            "width": 1034.81,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_2",
            "type": "image",
            "x": 543.37,
            "y": 371.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -743.4,
            "y": 115.74,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -2033.4,
            "y": 115.74,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6837",
            "type": "text",
            "x": 209.37,
            "y": 2060.26,
            "width": 872.06,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_2_194_6838",
            "type": "text",
            "x": 145.37,
            "y": 2330.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_2_194_6840",
            "type": "text",
            "x": 209.37,
            "y": 1943.51,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.37,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6841",
            "type": "text",
            "x": 208.37,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.37,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6842",
            "type": "text",
            "x": 208.37,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.37,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6843",
            "type": "text",
            "x": 208.37,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 264.01,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6844",
            "type": "text",
            "x": 114.57,
            "y": 2121.66,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_2_194_6845",
            "type": "text",
            "x": 114.57,
            "y": 2391.4,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_2_194_6848",
            "type": "text",
            "x": 100.47,
            "y": 2004.91,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": -1025.99,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.37,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6846",
            "type": "text",
            "x": 208.37,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.37,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_2_194_6847",
            "type": "text",
            "x": 208.37,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b364d"
        }
      }
    ]
  },
  {
    "id": "figma_3",
    "name": "Template 3",
    "background": {
      "type": "solid",
      "color": "#460a69"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": -486.66,
            "y": 1239.12,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6763",
            "type": "text",
            "x": 100.65,
            "y": 504.25,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_3",
            "type": "image",
            "x": 100.75,
            "y": 201.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -1776.66,
            "y": 1239.12,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6771",
            "type": "text",
            "x": 102.97,
            "y": 281.81,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_3_194_6772",
            "type": "text",
            "x": 102.97,
            "y": 551.55,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.75,
            "y": -241.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6764",
            "type": "text",
            "x": 207.75,
            "y": 2170.98,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.06,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6765",
            "type": "text",
            "x": 107.61,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_3_194_6767",
            "type": "text",
            "x": 107.61,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.94,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6766",
            "type": "text",
            "x": 109.93,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_3_194_6768",
            "type": "text",
            "x": 109.93,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.75,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.75,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.75,
            "y": 1141.35,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_3_194_6769",
            "type": "text",
            "x": 116.89,
            "y": 181.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_3_194_6770",
            "type": "text",
            "x": 116.89,
            "y": 664.28,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.75,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.75,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      }
    ]
  },
  {
    "id": "figma_4",
    "name": "Template 4",
    "background": {
      "type": "solid",
      "color": "#00496b"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": 1267.16,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_4_194_6702",
            "type": "text",
            "x": 87.0,
            "y": 705.0,
            "width": 1115.18,
            "height": 220.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 110.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_4",
            "type": "image",
            "x": 525.0,
            "y": 400.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_4_194_6703",
            "type": "text",
            "x": 208.0,
            "y": 2105.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_4_194_6705",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_4_194_6707",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 1096.06,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_4_194_6709",
            "type": "text",
            "x": 208.0,
            "y": 375.42,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_4_194_6710",
            "type": "text",
            "x": 208.0,
            "y": 258.67,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#70aa1e"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_4_194_6704",
            "type": "text",
            "x": 208.0,
            "y": 2105.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_4_194_6706",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_4_194_6708",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#70aa1e"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#70aa1e"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      }
    ]
  },
  {
    "id": "figma_5",
    "name": "Template 5",
    "background": {
      "type": "solid",
      "color": "#96003f"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": -368.37,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6681",
            "type": "text",
            "x": 87.0,
            "y": 2212.24,
            "width": 1115.18,
            "height": 220.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 110.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_5",
            "type": "image",
            "x": 526.0,
            "y": 1909.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6669",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_5_194_6674",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6670",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_5_194_6675",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6671",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_5_194_6676",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6672",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_5_194_6677",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6673",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_5_194_6678",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6680",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6683",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6682",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_5_194_6679",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#96003f"
        }
      }
    ]
  },
  {
    "id": "figma_6",
    "name": "Template 6",
    "background": {
      "type": "solid",
      "color": "#000000"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_6_194_6608",
            "type": "text",
            "x": 100.65,
            "y": 647.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_6",
            "type": "image",
            "x": 101.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.55,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_6_194_6609",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6612",
            "type": "text",
            "x": 102.97,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.45,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_6_194_6611",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 344.51,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.49,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_6_194_6610",
            "type": "text",
            "x": 112.25,
            "y": 2057.24,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6613",
            "type": "text",
            "x": 112.25,
            "y": 2326.98,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1096.06,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_6_194_6614",
            "type": "text",
            "x": 208.0,
            "y": 395.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6615",
            "type": "text",
            "x": 145.0,
            "y": 665.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6616",
            "type": "text",
            "x": 208.0,
            "y": 278.79,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_6_194_6619",
            "type": "shape",
            "shape": "rectangle",
            "x": 408.0,
            "y": 1470.7,
            "width": 473.62,
            "height": 128.41,
            "fill": "#000000",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6618",
            "type": "text",
            "x": 208.0,
            "y": 1196.7,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_6_194_6620",
            "type": "text",
            "x": 456.31,
            "y": 1502.91,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      }
    ]
  },
  {
    "id": "figma_7",
    "name": "Template 7",
    "background": {
      "type": "gradient",
      "gradient": {
        "direction": "to-r",
        "stops": [
          {
            "color": "#3f3ede",
            "position": 0
          },
          {
            "color": "#1a1983",
            "position": 100
          }
        ]
      }
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_7_194_6533",
            "type": "text",
            "x": 100.65,
            "y": 647.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_7",
            "type": "image",
            "x": 101.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.55,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6534",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_7_194_6536",
            "type": "text",
            "x": 102.97,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#73c7e7",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.45,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6535",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6538",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6537",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#73c7e7",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_7_194_6539",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_7_194_6541",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#73c7e7",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6540",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 494.18,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6543",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6542",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#73c7e7",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_7_194_6544",
            "type": "text",
            "x": 208.0,
            "y": 373.4,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_7_194_6546",
            "type": "text",
            "x": 145.0,
            "y": 643.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#73c7e7",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_7_194_6545",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_8",
    "name": "Template 8",
    "background": {
      "type": "solid",
      "color": "#047956"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_8_194_6500",
            "type": "text",
            "x": 100.65,
            "y": 754.86,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_8",
            "type": "image",
            "x": 101.0,
            "y": 432.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6501",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6506",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#01965d"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6502",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6507",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6503",
            "type": "text",
            "x": 208.0,
            "y": 2389.38,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6508",
            "type": "text",
            "x": 208.0,
            "y": 2272.63,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#01965d"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6504",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6509",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6505",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6510",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6517",
            "type": "text",
            "x": 208.0,
            "y": 2381.33,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#01965d"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6516",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_8_194_6515",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#047956"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_8_194_6513",
            "type": "shape",
            "shape": "rectangle",
            "x": 408.0,
            "y": 1451.58,
            "width": 473.62,
            "height": 128.41,
            "fill": "#047956",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6512",
            "type": "text",
            "x": 208.0,
            "y": 1177.58,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_8_194_6514",
            "type": "text",
            "x": 456.31,
            "y": 1483.79,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#01965d"
        }
      }
    ]
  },
  {
    "id": "figma_9",
    "name": "Template 9",
    "background": {
      "type": "solid",
      "color": "#012949"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": 1387.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6412",
            "type": "text",
            "x": 100.65,
            "y": 523.37,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_9",
            "type": "image",
            "x": 101.0,
            "y": 200.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#012949"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6417",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6418",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#fac70c",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6419",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#fac70c",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b4569"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6420",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#012949"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.05,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#0b4569"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.95,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#012949"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6422",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b4569"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6421",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#fac70c",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6423",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6425",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#fac70c",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#012949"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_9_194_6424",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b4569"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#012949"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_9_194_6415",
            "type": "shape",
            "shape": "rectangle",
            "x": 408.0,
            "y": 1470.7,
            "width": 473.62,
            "height": 128.41,
            "fill": "#fac70c",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6414",
            "type": "text",
            "x": 208.0,
            "y": 1196.7,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_9_194_6416",
            "type": "text",
            "x": 456.31,
            "y": 1502.91,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#0b4569"
        }
      }
    ]
  },
  {
    "id": "figma_10",
    "name": "Template 10",
    "background": {
      "type": "gradient",
      "gradient": {
        "direction": "to-br",
        "stops": [
          {
            "color": "#3f3edd",
            "position": 0
          },
          {
            "color": "#1a1983",
            "position": 100
          }
        ]
      }
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 174.2,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6353",
            "type": "text",
            "x": 100.65,
            "y": 403.6,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_10",
            "type": "image",
            "x": 101.0,
            "y": 101.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#050505"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6354",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6358",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_10_194_6360",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_10_194_6362",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6356",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 344.51,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.49,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6364",
            "type": "text",
            "x": 112.25,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_10_194_6365",
            "type": "text",
            "x": 112.25,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6355",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6359",
            "type": "text",
            "x": 208.0,
            "y": 373.4,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_10_194_6361",
            "type": "text",
            "x": 145.0,
            "y": 643.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_10_194_6363",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_10_194_6357",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_11",
    "name": "Template 11",
    "background": {
      "type": "solid",
      "color": "#fbd855"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 546.6,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6320",
            "type": "text",
            "x": 152.92,
            "y": 626.42,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_11_194_6323",
            "type": "text",
            "x": 127.92,
            "y": 1121.53,
            "width": 1034.81,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_11",
            "type": "image",
            "x": 524.91,
            "y": 311.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -743.4,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -2033.4,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6321",
            "type": "text",
            "x": 208.91,
            "y": 2060.26,
            "width": 872.06,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_11_194_6322",
            "type": "text",
            "x": 144.91,
            "y": 2330.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_11_194_6324",
            "type": "text",
            "x": 208.91,
            "y": 1943.51,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6325",
            "type": "text",
            "x": 207.92,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6326",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6327",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 264.01,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6328",
            "type": "text",
            "x": 114.57,
            "y": 2121.66,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_11_194_6329",
            "type": "text",
            "x": 114.57,
            "y": 2391.39,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_11_194_6332",
            "type": "text",
            "x": 100.47,
            "y": 2004.91,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": -1025.99,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6330",
            "type": "text",
            "x": 207.91,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#7937ff"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_11_194_6331",
            "type": "text",
            "x": 207.91,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-br",
            "stops": [
              {
                "color": "#ffac28",
                "position": 0
              },
              {
                "color": "#ffe45f",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_12",
    "name": "Template 12",
    "background": {
      "type": "solid",
      "color": "#000000"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": -506.79,
            "y": 1198.86,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6238",
            "type": "text",
            "x": 100.65,
            "y": 504.25,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_12",
            "type": "image",
            "x": 100.91,
            "y": 201.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2726a1"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -1796.79,
            "y": 1198.86,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6246",
            "type": "text",
            "x": 102.97,
            "y": 281.81,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_12_194_6247",
            "type": "text",
            "x": 102.97,
            "y": 551.55,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6239",
            "type": "text",
            "x": 207.91,
            "y": 2326.98,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.06,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6240",
            "type": "text",
            "x": 107.61,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_12_194_6242",
            "type": "text",
            "x": 107.61,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.94,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6241",
            "type": "text",
            "x": 109.93,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_12_194_6243",
            "type": "text",
            "x": 109.93,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#2726a1"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_12_194_6244",
            "type": "text",
            "x": 116.88,
            "y": 181.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_12_194_6245",
            "type": "text",
            "x": 116.88,
            "y": 664.28,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      }
    ]
  },
  {
    "id": "figma_13",
    "name": "Template 13",
    "background": {
      "type": "solid",
      "color": "#3f3edf"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": 1267.16,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_13_194_6177",
            "type": "text",
            "x": 87.0,
            "y": 705.54,
            "width": 1115.18,
            "height": 220.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 110.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_13",
            "type": "image",
            "x": 530.0,
            "y": 403.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_13_194_6178",
            "type": "text",
            "x": 208.0,
            "y": 2105.56,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_13_194_6180",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_13_194_6182",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 1096.06,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_13_194_6184",
            "type": "text",
            "x": 208.0,
            "y": 375.42,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_13_194_6185",
            "type": "text",
            "x": 208.0,
            "y": 258.67,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_13_194_6179",
            "type": "text",
            "x": 208.0,
            "y": 2105.56,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_13_194_6181",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_13_194_6183",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#8221e9"
        }
      }
    ]
  },
  {
    "id": "figma_14",
    "name": "Template 14",
    "background": {
      "type": "solid",
      "color": "#c7e1e7"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 184.92,
            "y": -368.37,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6149",
            "type": "text",
            "x": 86.91,
            "y": 2212.24,
            "width": 1115.18,
            "height": 220.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 110.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_14",
            "type": "image",
            "x": 525.91,
            "y": 1909.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6145",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_14_194_6146",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6154",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_14_194_6155",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6158",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_14_194_6159",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6150",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_14_194_6152",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#c7e1e7"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6151",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_14_194_6153",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#c7e1e7"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6148",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#c7e1e7"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6157",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6156",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_14_194_6147",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      }
    ]
  },
  {
    "id": "figma_15",
    "name": "Template 15",
    "background": {
      "type": "solid",
      "color": "#2a42dc"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_15_194_6084",
            "type": "text",
            "x": 100.0,
            "y": 647.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_15",
            "type": "image",
            "x": 100.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2d2cbb"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.55,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_15_194_6085",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6088",
            "type": "text",
            "x": 102.97,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2d2cbb"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.45,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_15_194_6087",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2a42dc"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.91,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#2a42dc"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 344.51,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#2a42dc"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.49,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_15_194_6086",
            "type": "text",
            "x": 112.25,
            "y": 2047.18,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6089",
            "type": "text",
            "x": 112.25,
            "y": 2316.92,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#2d2cbb"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 1096.06,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_15_194_6090",
            "type": "text",
            "x": 207.91,
            "y": 395.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6091",
            "type": "text",
            "x": 144.91,
            "y": 665.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6092",
            "type": "text",
            "x": 207.91,
            "y": 278.79,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2d2cbb"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_15_194_6095",
            "type": "shape",
            "shape": "rectangle",
            "x": 407.91,
            "y": 1483.53,
            "width": 473.62,
            "height": 128.41,
            "fill": "#2d2cbc",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6094",
            "type": "text",
            "x": 207.91,
            "y": 1169.53,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_15_194_6096",
            "type": "text",
            "x": 456.22,
            "y": 1515.74,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#2a42dc"
        }
      }
    ]
  },
  {
    "id": "figma_16",
    "name": "Template 16",
    "background": {
      "type": "gradient",
      "gradient": {
        "direction": "to-r",
        "stops": [
          {
            "color": "#3f3ede",
            "position": 0
          },
          {
            "color": "#1a1983",
            "position": 100
          }
        ]
      }
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_16_194_5999",
            "type": "text",
            "x": 100.65,
            "y": 647.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_16",
            "type": "image",
            "x": 101.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.56,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6000",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_16_194_6002",
            "type": "text",
            "x": 102.97,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.44,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6001",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6004",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6003",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_16_194_6005",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_16_194_6007",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6006",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 494.18,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6009",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6008",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_16_194_6010",
            "type": "text",
            "x": 208.0,
            "y": 373.4,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_16_194_6012",
            "type": "text",
            "x": 145.0,
            "y": 643.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_16_194_6011",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#3f3ede",
                "position": 0
              },
              {
                "color": "#1a1983",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_17",
    "name": "Template 17",
    "background": {
      "type": "solid",
      "color": "#00496b"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_17_194_5957",
            "type": "text",
            "x": 100.65,
            "y": 754.86,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_17",
            "type": "image",
            "x": 100.91,
            "y": 432.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5958",
            "type": "text",
            "x": 207.92,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5963",
            "type": "text",
            "x": 207.92,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5959",
            "type": "text",
            "x": 207.92,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5964",
            "type": "text",
            "x": 207.92,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5960",
            "type": "text",
            "x": 207.91,
            "y": 2389.38,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5965",
            "type": "text",
            "x": 207.91,
            "y": 2272.63,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5961",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5966",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5962",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5967",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5974",
            "type": "text",
            "x": 207.91,
            "y": 2381.33,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5973",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_17_194_5972",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_17_194_5970",
            "type": "shape",
            "shape": "rectangle",
            "x": 407.92,
            "y": 1491.58,
            "width": 473.62,
            "height": 128.41,
            "fill": "#3f3edf",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5969",
            "type": "text",
            "x": 207.91,
            "y": 1177.58,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_17_194_5971",
            "type": "text",
            "x": 456.23,
            "y": 1523.79,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      }
    ]
  },
  {
    "id": "figma_18",
    "name": "Template 18",
    "background": {
      "type": "solid",
      "color": "#3f3edf"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 184.91,
            "y": 1387.93,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5867",
            "type": "text",
            "x": 100.0,
            "y": 523.37,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_18",
            "type": "image",
            "x": 100.0,
            "y": 200.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5872",
            "type": "text",
            "x": 207.91,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5873",
            "type": "text",
            "x": 144.91,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5874",
            "type": "text",
            "x": 207.91,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5875",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.06,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.94,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5877",
            "type": "text",
            "x": 207.91,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5876",
            "type": "text",
            "x": 207.91,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5878",
            "type": "text",
            "x": 207.91,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5880",
            "type": "text",
            "x": 144.91,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_18_194_5879",
            "type": "text",
            "x": 207.91,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_18_194_5870",
            "type": "shape",
            "shape": "rectangle",
            "x": 407.91,
            "y": 1491.58,
            "width": 473.62,
            "height": 128.41,
            "fill": "#e16550",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5869",
            "type": "text",
            "x": 207.91,
            "y": 1177.58,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_18_194_5871",
            "type": "text",
            "x": 456.22,
            "y": 1523.79,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#3f3edf"
        }
      }
    ]
  },
  {
    "id": "figma_19",
    "name": "Template 19",
    "background": {
      "type": "solid",
      "color": "#00268f"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 174.2,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5798",
            "type": "text",
            "x": 100.65,
            "y": 403.6,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_19",
            "type": "image",
            "x": 101.0,
            "y": 101.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#641b61"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5799",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5803",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_19_194_5805",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_19_194_5807",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5801",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 344.51,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.49,
            "y": 892.75,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5809",
            "type": "text",
            "x": 112.25,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_19_194_5810",
            "type": "text",
            "x": 112.25,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 188.12,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5800",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5804",
            "type": "text",
            "x": 208.0,
            "y": 373.4,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_19_194_5806",
            "type": "text",
            "x": 145.0,
            "y": 643.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_19_194_5808",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_19_194_5802",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#00268f"
        }
      }
    ]
  },
  {
    "id": "figma_20",
    "name": "Template 20",
    "background": {
      "type": "solid",
      "color": "#460a69"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": -506.79,
            "y": 1198.86,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5744",
            "type": "text",
            "x": 100.65,
            "y": 504.25,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_20",
            "type": "image",
            "x": 100.91,
            "y": 201.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -1796.79,
            "y": 1198.86,
            "width": 2597.94,
            "height": 4010.88,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5752",
            "type": "text",
            "x": 102.97,
            "y": 281.81,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_20_194_5753",
            "type": "text",
            "x": 102.97,
            "y": 551.55,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5745",
            "type": "text",
            "x": 207.91,
            "y": 2326.98,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.06,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5746",
            "type": "text",
            "x": 107.61,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_20_194_5748",
            "type": "text",
            "x": 107.61,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.94,
            "y": 1029.63,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5747",
            "type": "text",
            "x": 109.93,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_20_194_5749",
            "type": "text",
            "x": 109.93,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#f7c406"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#f7c406"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 1091.02,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_20_194_5750",
            "type": "text",
            "x": 116.89,
            "y": 181.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_20_194_5751",
            "type": "text",
            "x": 116.89,
            "y": 664.28,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.91,
            "y": 397.56,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      }
    ]
  },
  {
    "id": "figma_21",
    "name": "Template 21",
    "background": {
      "type": "solid",
      "color": "#000000"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_21_194_5711",
            "type": "text",
            "x": 100.0,
            "y": 754.86,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_21",
            "type": "image",
            "x": 100.0,
            "y": 432.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5712",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5717",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5713",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5718",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5714",
            "type": "text",
            "x": 207.91,
            "y": 2389.38,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5719",
            "type": "text",
            "x": 207.91,
            "y": 2272.63,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5715",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5720",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5716",
            "type": "text",
            "x": 207.91,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5721",
            "type": "text",
            "x": 207.91,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5728",
            "type": "text",
            "x": 207.91,
            "y": 2381.33,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5727",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_21_194_5726",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_21_194_5724",
            "type": "shape",
            "shape": "rectangle",
            "x": 407.91,
            "y": 1491.58,
            "width": 473.62,
            "height": 128.41,
            "fill": "#3f3edf",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5723",
            "type": "text",
            "x": 207.91,
            "y": 1177.58,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_21_194_5725",
            "type": "text",
            "x": 456.22,
            "y": 1523.79,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#000000"
        }
      }
    ]
  },
  {
    "id": "figma_22",
    "name": "Template 22",
    "background": {
      "type": "solid",
      "color": "#00496b"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 546.6,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5652",
            "type": "text",
            "x": 152.92,
            "y": 626.42,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_22_194_5655",
            "type": "text",
            "x": 127.92,
            "y": 1121.53,
            "width": 1034.81,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_22",
            "type": "image",
            "x": 525.92,
            "y": 311.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": -743.4,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -2033.4,
            "y": 115.75,
            "width": 2760.38,
            "height": 3121.37,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5653",
            "type": "text",
            "x": 208.92,
            "y": 2059.51,
            "width": 872.06,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_22_194_5654",
            "type": "text",
            "x": 144.92,
            "y": 2327.51,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_22_194_5656",
            "type": "text",
            "x": 208.92,
            "y": 1943.51,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5657",
            "type": "text",
            "x": 207.92,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.92,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5658",
            "type": "text",
            "x": 207.92,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 264.01,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5659",
            "type": "text",
            "x": 114.57,
            "y": 2121.66,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_22_194_5660",
            "type": "text",
            "x": 114.57,
            "y": 2391.39,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_22_194_5663",
            "type": "text",
            "x": 100.47,
            "y": 2004.91,
            "width": 872.06,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#181817",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": -1025.99,
            "y": 115.75,
            "width": 2246.33,
            "height": 2246.33,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#00496b"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5661",
            "type": "text",
            "x": 207.92,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 184.91,
            "y": 108.7,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_22_194_5662",
            "type": "text",
            "x": 207.92,
            "y": 2309.87,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#181817",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffb200"
        }
      }
    ]
  },
  {
    "id": "figma_23",
    "name": "Template 23",
    "background": {
      "type": "gradient",
      "gradient": {
        "direction": "to-r",
        "stops": [
          {
            "color": "#4299ed",
            "position": 0
          },
          {
            "color": "#1174d3",
            "position": 100
          }
        ]
      }
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_23_194_5573",
            "type": "text",
            "x": 100.65,
            "y": 647.17,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_23",
            "type": "image",
            "x": 101.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.55,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5574",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_23_194_5576",
            "type": "text",
            "x": 102.97,
            "y": 450.9,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#b5daff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.45,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5575",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5578",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5577",
            "type": "text",
            "x": 208.0,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_23_194_5579",
            "type": "text",
            "x": 208.0,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_23_194_5581",
            "type": "text",
            "x": 145.0,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#b5daff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5580",
            "type": "text",
            "x": 208.0,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 494.18,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.03,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5583",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.03,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5582",
            "type": "text",
            "x": 208.0,
            "y": 256.65,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_23_194_5584",
            "type": "text",
            "x": 208.0,
            "y": 373.4,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_23_194_5586",
            "type": "text",
            "x": 145.0,
            "y": 643.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#b5daff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 1091.03,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_23_194_5585",
            "type": "text",
            "x": 208.0,
            "y": 365.35,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-r",
            "stops": [
              {
                "color": "#4299ed",
                "position": 0
              },
              {
                "color": "#1174d3",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_24",
    "name": "Template 24",
    "background": {
      "type": "solid",
      "color": "#ffffff"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": 1267.16,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_24_194_5545",
            "type": "text",
            "x": 87.0,
            "y": 705.54,
            "width": 1115.18,
            "height": 220.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 110.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_24",
            "type": "image",
            "x": 525.0,
            "y": 403.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.95,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_24_194_5546",
            "type": "text",
            "x": 208.0,
            "y": 2105.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5548",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5550",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 181.16,
            "y": 1096.05,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_24_194_5552",
            "type": "text",
            "x": 210.0,
            "y": 395.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5553",
            "type": "text",
            "x": 147.0,
            "y": 665.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5554",
            "type": "text",
            "x": 210.0,
            "y": 278.79,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": -301.95,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_24_194_5547",
            "type": "text",
            "x": 208.0,
            "y": 2105.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5549",
            "type": "text",
            "x": 145.0,
            "y": 2375.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_24_194_5551",
            "type": "text",
            "x": 208.0,
            "y": 1988.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "gradient",
          "gradient": {
            "direction": "to-b",
            "stops": [
              {
                "color": "#3f3edd",
                "position": 0
              },
              {
                "color": "#1b1a85",
                "position": 100
              }
            ]
          }
        }
      }
    ]
  },
  {
    "id": "figma_25",
    "name": "Template 25",
    "background": {
      "type": "solid",
      "color": "#ffffff"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 174.2,
            "y": 1387.94,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5450",
            "type": "text",
            "x": 100.65,
            "y": 523.37,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_25",
            "type": "image",
            "x": 100.91,
            "y": 200.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5455",
            "type": "text",
            "x": 207.91,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5456",
            "type": "text",
            "x": 144.91,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5457",
            "type": "text",
            "x": 207.91,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 184.91,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5458",
            "type": "text",
            "x": 207.91,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 476.06,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": -813.94,
            "y": 227.46,
            "width": 1622.44,
            "height": 3532.74,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5460",
            "type": "text",
            "x": 207.91,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5459",
            "type": "text",
            "x": 207.91,
            "y": 1993.84,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5461",
            "type": "text",
            "x": 207.91,
            "y": 2110.59,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5463",
            "type": "text",
            "x": 144.91,
            "y": 2380.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 184.91,
            "y": -296.91,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_25_194_5462",
            "type": "text",
            "x": 207.91,
            "y": 2102.54,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 184.91,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_25_194_5453",
            "type": "shape",
            "shape": "rectangle",
            "x": 398.41,
            "y": 1491.58,
            "width": 492.62,
            "height": 141.41,
            "fill": "#f7c406",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5452",
            "type": "text",
            "x": 207.91,
            "y": 1177.58,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_25_194_5454",
            "type": "text",
            "x": 446.72,
            "y": 1523.79,
            "width": 396.0,
            "height": 77.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "Inter",
            "fontWeight": 500,
            "color": "#1a100b",
            "align": "center",
            "lineHeight": 1.21,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#1174d3"
        }
      }
    ]
  },
  {
    "id": "figma_26",
    "name": "Template 26",
    "background": {
      "type": "solid",
      "color": "#ffffff"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [
          {
            "x": 185.0,
            "y": -368.37,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5427",
            "type": "text",
            "x": 87.0,
            "y": 2212.24,
            "width": 1115.18,
            "height": 208.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_26",
            "type": "image",
            "x": 525.0,
            "y": 1909.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffffff"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5413",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_26_194_5418",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#181817"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5414",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_26_194_5419",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffffff"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5415",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_26_194_5420",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#181817"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5416",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_26_194_5421",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffffff"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5417",
            "type": "text",
            "x": 208.0,
            "y": 274.77,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_26_194_5422",
            "type": "text",
            "x": 208.0,
            "y": 158.02,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#181817"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5426",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffffff"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5425",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#181817"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5424",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#000000",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#ffffff"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [
          {
            "x": 185.0,
            "y": 685.41,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_26_194_5423",
            "type": "text",
            "x": 208.0,
            "y": 212.37,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#181817"
        }
      }
    ]
  },
  {
    "id": "figma_27",
    "name": "Template 27",
    "background": {
      "type": "solid",
      "color": "#460a69"
    },
    "screens": [
      {
        "screenIndex": 0,
        "mockups": [],
        "layers": [
          {
            "id": "text_27_194_5363",
            "type": "text",
            "x": 100.0,
            "y": 647.0,
            "width": 984.34,
            "height": 420.0,
            "content": "This is a very catchy App Headline",
            "fontSize": 140.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "logo_27",
            "type": "image",
            "x": 100.0,
            "y": 344.0,
            "width": 240.0,
            "height": 240.0,
            "src": "",
            "rotation": 0,
            "opacity": 1,
            "cornerRadius": 53
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 1,
        "mockups": [
          {
            "x": 337.55,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_27_194_5351",
            "type": "text",
            "x": 102.97,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5354",
            "type": "text",
            "x": 102.97,
            "y": 450.91,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 2,
        "mockups": [
          {
            "x": -952.45,
            "y": 1055.8,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_27_194_5353",
            "type": "text",
            "x": 105.29,
            "y": 181.17,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 3,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 4,
        "mockups": [
          {
            "x": 344.51,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 5,
        "mockups": [
          {
            "x": -945.49,
            "y": -2373.28,
            "width": 1890.17,
            "height": 4113.29,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_27_194_5352",
            "type": "text",
            "x": 112.25,
            "y": 2047.18,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5355",
            "type": "text",
            "x": 112.25,
            "y": 2316.92,
            "width": 992.39,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "left",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 6,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 7,
        "mockups": [
          {
            "x": 185.0,
            "y": 1096.05,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [
          {
            "id": "text_27_194_5356",
            "type": "text",
            "x": 208.0,
            "y": 395.55,
            "width": 873.62,
            "height": 208.0,
            "content": "This is a title for a helpful feature",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5357",
            "type": "text",
            "x": 145.0,
            "y": 665.0,
            "width": 1000.0,
            "height": 128.0,
            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Erat.",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 400,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5358",
            "type": "text",
            "x": 208.0,
            "y": 278.8,
            "width": 873.62,
            "height": 56.0,
            "content": "FEATURE",
            "fontSize": 56.0,
            "fontFamily": "DM Sans",
            "fontWeight": 600,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 8,
        "mockups": [
          {
            "x": 185.0,
            "y": 396.55,
            "width": 919.92,
            "height": 2001.89,
            "transform": null
          }
        ],
        "layers": [],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      },
      {
        "screenIndex": 9,
        "mockups": [],
        "layers": [
          {
            "id": "badge_27_194_5361",
            "type": "shape",
            "shape": "rectangle",
            "x": 408.0,
            "y": 1483.53,
            "width": 473.62,
            "height": 128.41,
            "fill": "#e93ee3",
            "cornerRadius": 1005.5,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5360",
            "type": "text",
            "x": 208.0,
            "y": 1169.53,
            "width": 873.62,
            "height": 208.0,
            "content": "Place here a very catchy title",
            "fontSize": 104.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          },
          {
            "id": "text_27_194_5362",
            "type": "text",
            "x": 456.31,
            "y": 1515.74,
            "width": 377.0,
            "height": 64.0,
            "content": "This is a CTA",
            "fontSize": 64.0,
            "fontFamily": "DM Sans",
            "fontWeight": 500,
            "color": "#ffffff",
            "align": "center",
            "lineHeight": 1.0,
            "letterSpacing": 0.0,
            "rotation": 0,
            "opacity": 1
          }
        ],
        "background": {
          "type": "solid",
          "color": "#460a69"
        }
      }
    ]
  }
];
