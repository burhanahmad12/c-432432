
import TradingViewWidget from 'react-tradingview-widget';

const CryptoChart = () => {
  return (
    <div className="glass-card p-6 rounded-lg mb-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Trading View By Cdw Burhan</h2>
      </div>
      <div className="h-[400px] w-full">
        <TradingViewWidget
          symbol="FX:EURUSD"
          theme="dark"
          locale="en"
          autosize
          hide_side_toolbar={true}
          allow_symbol_change={true}
          interval="D"
          toolbar_bg="#141413"
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
