import { useRepositories } from "hooks";
import { VictoryBar, VictoryGroup, VictoryTooltip } from "victory";

export const Charts = () => {
  const { data } = useRepositories();

  const chartData = data?.data.items.map((repository) => ({
    x: repository.name,
    y: new Date(repository.created_at),
    y0: new Date(repository.updated_at),
  }));

  return (
    <VictoryGroup height={500} domainPadding={{ x: 25 }}>
      <VictoryBar
        horizontal
        style={{
          data: { fill: "#c43a31" },
        }}
        data={chartData}
        labelComponent={
          <VictoryTooltip
            center={{ x: 225, y: 30 }}
            pointerOrientation="bottom"
            flyoutWidth={150}
            flyoutHeight={50}
            pointerWidth={150}
            cornerRadius={0}
          />
        }
        labels={(datum) => {
          return datum.datum.xName;
        }}
      />
    </VictoryGroup>
  );
};
