export interface FigmaMockupData {
  screenIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  transform: string | null;
}

export interface FigmaTemplate {
  id: string;
  name: string;
  backgroundUrl: string;
  screens: FigmaMockupData[];
}

export const FIGMA_TEMPLATES: FigmaTemplate[] = [
  {
    "id": "figma_1",
    "name": "Figma Template 1",
    "backgroundUrl": "/templates/figma-template-1.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 174.0,
        "y": 1091.0,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 176.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 178.84000000000015,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 181.15999999999985,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 188.1199999999999,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 190.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 192.79999999999927,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 195.10000000000036,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_2",
    "name": "Figma Template 2",
    "backgroundUrl": "/templates/figma-template-2.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.3699999999999,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.3699999999999,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.3699999999999,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.39999999999964,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.39999999999964,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_3",
    "name": "Figma Template 3",
    "backgroundUrl": "/templates/figma-template-3.svg",
    "screens": [
      {
        "screenIndex": 2,
        "x": 184.75,
        "y": -241.556,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.75,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.75,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.75,
        "y": 1141.35,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.70000000000073,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.70000000000073,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_4",
    "name": "Figma Template 4",
    "backgroundUrl": "/templates/figma-template-4.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.0,
        "y": 1267.16,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -301.944,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 1096.06,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -301.944,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_5",
    "name": "Figma Template 5",
    "backgroundUrl": "/templates/figma-template-5.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.001,
        "y": -368.372,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_6",
    "name": "Figma Template 6",
    "backgroundUrl": "/templates/figma-template-6.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1096.06,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_7",
    "name": "Figma Template 7",
    "backgroundUrl": "/templates/figma-template-7.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 494.182,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_8",
    "name": "Figma Template 8",
    "backgroundUrl": "/templates/figma-template-8.svg",
    "screens": [
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 108.7,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 108.7,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_9",
    "name": "Figma Template 9",
    "backgroundUrl": "/templates/figma-template-9.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.0,
        "y": 1387.94,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_10",
    "name": "Figma Template 10",
    "backgroundUrl": "/templates/figma-template-10.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 174.199,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": -296.911,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 397.56,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_11",
    "name": "Figma Template 11",
    "backgroundUrl": "/templates/figma-template-11.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 184.90999999999985,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 184.90999999999985,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 685.413,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 108.7,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.89999999999964,
        "y": 108.7,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_12",
    "name": "Figma Template 12",
    "backgroundUrl": "/templates/figma-template-12.svg",
    "screens": [
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 108.7,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 397.56,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": 397.56,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 397.56,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.89999999999964,
        "y": 397.56,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_13",
    "name": "Figma Template 13",
    "backgroundUrl": "/templates/figma-template-13.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.0,
        "y": 1267.16,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -301.943,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 1096.06,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -301.943,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_14",
    "name": "Figma Template 14",
    "backgroundUrl": "/templates/figma-template-14.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 184.915,
        "y": -368.371,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 184.92000000000007,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 184.92000000000007,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 184.92000000000007,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.92000000000007,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.89999999999964,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_15",
    "name": "Figma Template 15",
    "backgroundUrl": "/templates/figma-template-15.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 184.90999999999985,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 1096.06,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_16",
    "name": "Figma Template 16",
    "backgroundUrl": "/templates/figma-template-16.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 494.182,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_17",
    "name": "Figma Template 17",
    "backgroundUrl": "/templates/figma-template-17.svg",
    "screens": [
      {
        "screenIndex": 1,
        "x": 184.91000000000008,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 184.90999999999985,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_18",
    "name": "Figma Template 18",
    "backgroundUrl": "/templates/figma-template-18.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 184.912,
        "y": 1387.93,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 184.91000000000008,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 396.553,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_19",
    "name": "Figma Template 19",
    "backgroundUrl": "/templates/figma-template-19.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 174.199,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": -296.912,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 188.1199999999999,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_20",
    "name": "Figma Template 20",
    "backgroundUrl": "/templates/figma-template-20.svg",
    "screens": [
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 1091.02,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.89999999999964,
        "y": 397.559,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_21",
    "name": "Figma Template 21",
    "backgroundUrl": "/templates/figma-template-21.svg",
    "screens": [
      {
        "screenIndex": 1,
        "x": 184.91000000000008,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 184.90999999999985,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": 108.699,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 685.412,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_22",
    "name": "Figma Template 22",
    "backgroundUrl": "/templates/figma-template-22.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 184.92000000000007,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 184.90999999999985,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.92000000000007,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 108.701,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 184.89999999999964,
        "y": 108.701,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_23",
    "name": "Figma Template 23",
    "backgroundUrl": "/templates/figma-template-23.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 494.184,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1091.03,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 1091.03,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 1091.03,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_24",
    "name": "Figma Template 24",
    "backgroundUrl": "/templates/figma-template-24.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.0,
        "y": 1267.16,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": -301.945,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 181.15999999999985,
        "y": 1096.05,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": -301.945,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 396.551,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_25",
    "name": "Figma Template 25",
    "backgroundUrl": "/templates/figma-template-25.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 174.203,
        "y": 1387.94,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 184.91000000000008,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 184.90999999999985,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 184.90999999999985,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 184.90999999999985,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 184.90999999999985,
        "y": -296.91,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 184.89999999999964,
        "y": 396.555,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_26",
    "name": "Figma Template 26",
    "backgroundUrl": "/templates/figma-template-26.svg",
    "screens": [
      {
        "screenIndex": 0,
        "x": 185.001,
        "y": -368.371,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 1,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 2,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 4,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 5,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 9,
        "x": 185.0,
        "y": 685.414,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  },
  {
    "id": "figma_27",
    "name": "Figma Template 27",
    "backgroundUrl": "/templates/figma-template-27.svg",
    "screens": [
      {
        "screenIndex": 3,
        "x": 185.0,
        "y": 396.555,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 6,
        "x": 185.0,
        "y": 396.555,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 7,
        "x": 185.0,
        "y": 1096.05,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      },
      {
        "screenIndex": 8,
        "x": 185.0,
        "y": 396.555,
        "width": 919.922,
        "height": 2001.89,
        "transform": null
      }
    ]
  }
];
