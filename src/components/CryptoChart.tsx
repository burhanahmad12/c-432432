
import { useEffect, useState } from 'react';
import TradingViewWidget from 'react-tradingview-widget';

const CryptoChart = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setIsDark(isDarkMode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="glass-card p-6 rounded-xl animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-primary">Forex Trading View Dashboard</h2>
      </div>
      <div className="h-[70vh] w-full rounded-lg overflow-hidden border border-secondary/50">
        <TradingViewWidget
          symbol="FX:EURUSD"
          theme={isDark ? "dark" : "light"}
          locale="en"
          autosize
          hide_side_toolbar={true}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg={isDark ? "#1E293B" : "#F8FAFC"}
          enable_publishing={false}
          hide_top_toolbar={false}
          save_image={true}
          container_id="tradingview_chart"
          studies={["RSI@tv-basicstudies"]}
          style="1"
          withdateranges={true}
        />
      </div>
    </div>
  );
};

export default CryptoChart;
