import * as webVitals from 'web-vitals';

const wv = webVitals as any;

const reportWebVitals = (onPerfEntry?: (metric: any) => void) => {
  if (onPerfEntry && typeof onPerfEntry === 'function') {
    wv.getCLS?.(onPerfEntry);
    wv.getFID?.(onPerfEntry);
    wv.getFCP?.(onPerfEntry);
    wv.getLCP?.(onPerfEntry);
    wv.getTTFB?.(onPerfEntry);
  }
};

export default reportWebVitals;
