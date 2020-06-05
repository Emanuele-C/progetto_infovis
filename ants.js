
const run = function(data){

    // Add IDs to data
    data = data
        .map(function (element, position) {
            element.id = position;
            return element;
        });

    function pointOnEllipse(d, angle) {
        const x = (d.larghezzaAddome * Math.cos(angle)) + d.horizontalPosition;
        const y = (d.larghezzaAddome * 3 * Math.sin(angle)) + d.verticalPosition + d.larghezzaAddome * 3;
        return [x, y];
    }


    function pointOnCircle(d, angle) {
        const x = (d.larghezzaAddome / 2 * Math.cos(angle)) + d.horizontalPosition;
        const y = (d.larghezzaAddome / 2 * Math.sin(angle)) + d.verticalPosition;
        return [x, y];
    }

    function getSideLength(diagonal) {
        return diagonal / Math.sqrt(2)
    }

    const onClickLeg = function (clickedDataItem, left) {

        data = data
            .map(i => {
                if (left) {
                    i.verticalPosition = clickedDataItem.legLength;
                } else {
                    i.horizontalPosition = clickedDataItem.legLength;
                }

                return i;
            });
            
        render(data, 4000);
    };

    const onClickBody = function (clickedDataItem, left) {

        data = data
            .map(i => {
                if (left) {
                    i.verticalPosition = clickedDataItem.larghezzaAddome;
                } else {
                    i.horizontalPosition = clickedDataItem.larghezzaAddome;
                }

                return i;
            });

        render(data, 4000);
    };        

     const onClickEye = function (clickedDataItem, left) {

        data = data
            .map(i => {
                if (left) {
                    i.verticalPosition = clickedDataItem.eyeDimension;
                } else {
                    i.horizontalPosition = clickedDataItem.eyeDimension;
                }

                return i;
            });

        render(data, 4000);
    };



    const onClickAntenna = function (clickedDataItem, left) {

        data = data
            .map(i => {
                if (left) {
                    i.verticalPosition = clickedDataItem.lunghezzaAntenna;
                } else {
                    i.horizontalPosition = clickedDataItem.lunghezzaAntenna;
                }

                return i;
            });

        render(data, 4000);
    };
//Main
    const svg = d3.select("body").append("svg").attr('width', 1500).attr('height', 850);

    let dataSet;

// d3.json(json_path)
//     .then(loadDataSet);
    render(data, 0);

    function render(dataSet, transitionTime) {

        const tx = d3
            .transition()
            .duration(transitionTime);

        const ants = svg
            .selectAll("g")
            .data(dataSet, function (element) {
                return element.id;
            });

        const enter = ants.enter();
        const group = enter.append("g");

        ants
            .exit()
            .remove();

        group
            .append("circle")
            .attr("stroke", "black")
            .attr("stroke-width", 2)
            .attr("class", "head")
            .attr('fill', "black")
            .attr('cx', function (d) {
                return d.horizontalPosition;
            })
            .attr('cy', function (d) {
                return d.verticalPosition;
            })
            .attr('r', function (d) {
                return d.larghezzaAddome / 2
            });

        ants.selectAll('.head')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition;
            })
            .attr('r', function (d) {
                return d.larghezzaAddome / 2
            });
        //body
        group
            .append("ellipse")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("class", "body")
            .attr('fill', "black")
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition + d.larghezzaAddome * 3
            })
            .attr('rx', function (d) {
                return d.larghezzaAddome
            })
            .attr('ry', function (d) {
                return d.larghezzaAddome * 3
            })    
             .on("click", function (target) {
                return onClickBody(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickBody(target, false);
            });

        ants.selectAll('.body')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition
            })
            .attr('cy', function (d) {
                return d.verticalPosition + d.larghezzaAddome * 3
            })
            .attr('rx', function (d) {
                return d.larghezzaAddome
            })
            .attr('ry', function (d) {
                return d.larghezzaAddome * 3
            });
        //right eye
        group
            .append("circle")
            .attr("class", "right_eye")
            .attr("fill", "white")
            .attr('cx', function (d) {
                return d.horizontalPosition + (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            })        
           .on("click", function (target) {
                return onClickEye(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickEye(target, false);
            });

        ants.selectAll('.right_eye')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition + (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            });

        //left eye
        group
            .append("circle")
            .attr("class", "left_eye")
            .attr("fill", "white")
            .attr('cx', function (d) {
                return d.horizontalPosition - (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            })        
           .on("click", function (target) {
                return onClickEye(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickEye(target, false);
            });

        ants.selectAll('.left_eye')
            .transition(tx)
            .attr('cx', function (d) {
                return d.horizontalPosition - (d.eyeDimension + 2)
            })
            .attr("cy", function (d) {
                return d.verticalPosition - Math.min(d.larghezzaAddome / 4, d.larghezzaAddome * 3 / 4)
            })
            .attr("r", function (d) {
                return d.eyeDimension
            });

        //front right leg
        group
            .append("polyline")
            .attr("class", "front_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y - s, x + s, y - d.legLength];
            });

        ants.selectAll('.front_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y - s, x + s, y - d.legLength];
            });

        //front left leg
        group
            .append("polyline")
            .attr("class", "front_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4);
                return [x, y, x - s, y - s, x - s, y - d.legLength];
            });

        ants.selectAll('.front_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4);
                return [x, y, x - s, y - s, x - s, y - d.legLength];
            });


        //middle right leg
        group
            .append("polyline")
            .attr("class", "middle_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition + d.larghezzaAddome, d.verticalPosition + d.larghezzaAddome * 3];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
            });

        ants.selectAll('.middle_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition + d.larghezzaAddome, d.verticalPosition + d.larghezzaAddome * 3];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x + d.legLength / 4, y, x + d.legLength / 4 + s, y + s];
            });

        //middle left leg
        group
            .append("polyline")
            .attr("class", "middle_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition - d.larghezzaAddome, d.verticalPosition + (d.larghezzaAddome * 3)];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
            });

        ants.selectAll('.middle_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = [d.horizontalPosition - d.larghezzaAddome, d.verticalPosition + (d.larghezzaAddome * 3)];
                const s = getSideLength(d.legLength * 3 / 4);
                return [x, y, x - d.legLength / 4, y, x - d.legLength / 4 - s, y + s];
            });

        //back right leg
        group
            .append("polyline")
            .attr("class", "back_right_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
             .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y + s, x + s, y + d.legLength];
            });

        ants.selectAll('.back_right_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x + s, y + s, x + s, y + d.legLength];
            });

        //back left leg
        group
            .append("polyline")
            .attr("class", "back_left_leg")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .on("click", function (target) {
                return onClickLeg(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickLeg(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x - s, y + s, x - s, y + d.legLength];
            });

        ants.selectAll('.back_left_leg')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnEllipse(d, Math.PI * 3 / 4);
                const s = getSideLength(d.legLength / 4)
                return [x, y, x - s, y + s, x - s, y + d.legLength];
            });

        //right antenna
        group
            .append("polyline")
            .attr("class", "right_antenna")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .style("cursor", "pointer")
            .on("click", function (target) {
                return onClickAntenna(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickAntenna(target, false);
            })
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4)
                return [x, y, x + s, y - s, x + s, y - d.lunghezzaAntenna];
            });

        ants.selectAll('.right_antenna')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4)
                return [x, y, x + s, y - s, x + s, y - d.lunghezzaAntenna];
            });

        //left antenna
        group
            .append("polyline")
            .attr("class", "left_antenna")
            .attr("fill", "None")
            .attr("stroke-width", 2)
            .attr("stroke", "black")
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4);
                return [x, y, x - s, y - s, x - s, y - d.lunghezzaAntenna];
            })
            .style("cursor", "pointer")
            .on("click", function (target) {
                return onClickAntenna(target, true);
            })
            .on("contextmenu", function (target) {
                return onClickAntenna(target, false);
            });

        ants.selectAll('.left_antenna')
            .transition(tx)
            .attr("points", function (d) {
                const [x, y] = pointOnCircle(d, -Math.PI * 3 / 4);
                const s = getSideLength(d.lunghezzaAntenna / 4);
                return [x, y, x - s, y - s, x - s, y - d.lunghezzaAntenna];
            });
    }

}