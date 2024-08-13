import type {
  OptionsGradient,
  QrTypeConersDots,
  QrTypeConersSquare,
  QrTypeRounded
} from '@/shared/interface/QrInterface'

export interface DefaultThemeInterface {
  name : string;
  dotsOptions: {
    type: QrTypeRounded
    gradient: OptionsGradient
  }
  conersSquareOptions: {
    type: QrTypeConersSquare;
    gradient: OptionsGradient;
  }
  conersDotsOptions: {
    type: QrTypeConersDots;
    gradient: OptionsGradient;
  }
  backgroundOptions: {
    gradient: OptionsGradient;
  }
  image: string;
  imageDemo: string;
  custom: boolean;
}

export const defaultTheme: DefaultThemeInterface = {
  name: "",
  image: '',
  imageDemo: '',
  custom: true,
  dotsOptions: {
    type: "rounded",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      color3: "#ff7575",
      percent_color2: 50,
      rotation: 0
    }
  },
  conersSquareOptions: {
    type: "square",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      color3: "#ff7575",
      percent_color2: 50,
      rotation: 0,
    }
  },
  conersDotsOptions: {
    type: "none",
    gradient: {
      mode: "single",
      color1: "#000000",
      color2: "#ff0000",
      color3: "#ff7575",
      percent_color2: 50,
      rotation: 0,
    }
  },
  backgroundOptions: {
    gradient: {
      mode: "single",
      color1: "#ffffff",
      color2: "#1051c8",
      color3: "#ff7575",
      percent_color2: 50,
      rotation: 0,
    }
  },
}

export const DEFAULT_THEME: DefaultThemeInterface[] = [
  {
    name: "Youtube",
    image: 'logo/youtube.svg',
    imageDemo: 'exemple/youtube.png',
    custom: false,
    dotsOptions: {
      type: 'dots',
      gradient: {
        mode: 'double',
        color1: '#EB0F0F',
        color2: '#F47B7B',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    conersSquareOptions: {
      type: 'dot',
      gradient: {
        mode: 'single',
        color1: '#EB0F0F',
        color2: '#ff0000',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    conersDotsOptions: {
      type: 'square',
      gradient: {
        mode: 'single',
        color1: '#EB0F0F',
        color2: '#ff0000',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    backgroundOptions: {
      gradient: {
        mode: 'single',
        color1: '#ffffff',
        color2: '#1051c8',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
  },
  {
    name: "Twitter",
    image: 'logo/twitter.svg',
    imageDemo: 'exemple/twitter.png',
    custom: false,
    dotsOptions: {
      type: 'classy-rounded',
      gradient: {
        mode: 'single',
        color1: '#00ACEE',
        color2: '#F47B7B',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    conersSquareOptions: {
      type: 'dot',
      gradient: {
        mode: 'single',
        color1: '#00ACEE',
        color2: '#ff0000',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    conersDotsOptions: {
      type: 'dot',
      gradient: {
        mode: 'single',
        color1: '#00ACEE',
        color2: '#ff0000',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
    backgroundOptions: {
      gradient: {
        mode: 'single',
        color1: '#ffffff',
        color2: '#1051c8',
        color3: '#ff7575',
        percent_color2: 50,
        rotation: 0
      }
    },
  }
]