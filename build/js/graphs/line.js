//TODO: refactor min/max functions into recursive reducers

const createLine = (data, workoutNames) => {

  const margin = {top: 15, right: 30, bottom: 20, left: 30},
    width = 700,
    height = 438,
    color = d3.scaleOrdinal(d3.schemeCategory20c),
    minReps = d3.min(data.reduce((acc,val) => acc.concat(d3.min(val, d => d[1])),[]));
    maxReps = d3.max(data.reduce((acc,val) => acc.concat(d3.max(val, d => d[1])),[]));
    minDate = d3.min(data.reduce((acc,val) => acc.concat(d3.min(val, d => d[0])),[]));
    maxDate = d3.max(data.reduce((acc,val) => acc.concat(d3.max(val, d => d[0])),[]));

  const svg = d3.select('#line')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom);

  const g = svg.append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const x = d3.scaleTime()
    .range([0, width])
    .domain([minDate, maxDate]);

  const y = d3.scaleLinear()
    .range([height, 0])
    .domain([minReps, maxReps ]);

  const line = d3.line()
    .x(d => x(d[0]))
    .y(d => y(d[1]));

  g.append('g')
    .attr('transform', `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .select('.domain');

  g.append('g')
    .call(d3.axisLeft(y))
    .append('text')
    .attr('fill', '#000')
    .attr('transform', 'rotate(-90)')
    .attr('y', 8)
    .attr('dy', '0.71em')
    .attr('text-anchor', 'end')
    .text('Number of first set reps')
    .attr('id','line-caption');

  data.forEach((_, index) => {
    g.append('path')
      .datum(data[index])
      .attr('id', `line-${workoutNames[index]}`)
      .attr('class', 'visible workout-line')
      .attr('fill', 'none')
      .attr('stroke', color(index))
      .attr('stroke-linejoin', 'round')
      .attr('stroke-linecap', 'round')
      .attr('stroke-width', 1.5)
      .attr('d', line);
  });
}
