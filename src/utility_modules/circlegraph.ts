function reverseString(str) {
    return str.split("").reverse().join("");
}


export function circleGraph(language_info: any[], edge_width: number, diameter: number, x_stretch: number, min_percent: number, 
    edge: string, border: string, bg: string, graph_chars: string, labels: boolean, label_offset: number, label_width: number, 
    start_angle: number, min_labels_x_dist: number, min_labels_y_dist: number, min_labels_x: number, min_labels_y: number, 
    label_marker: string, label_seperator: string, label_line: string[], label_lines: boolean) {

    let radius = diameter / 2;
    let label_tot = (label_offset + label_width);
    let circle_array = [];
    for (let y=0; y<Math.floor(radius*2 + edge_width*2); y++) {
        circle_array.push([]);
        for (let x=0; x<Math.floor((radius*2 + edge_width*2 + label_tot*2)*x_stretch); x++) {
            circle_array[y].push(bg);
        };   
    };

    let total_coding_s = 0;
    let current_s = 0;
    let rad_p_width = edge_width + radius;
    let rad_p_laboff = radius + label_offset;
    let origin = [(rad_p_width + label_tot) * x_stretch, rad_p_width];
    let max_angle = Math.PI * 100;
    let start_angle_pi = start_angle / 360 * max_angle;
    let old_angle = 0;
    let angle;
    let coords;
    let point_offset;

    for (let i=0; i<language_info.length; i++) {
        total_coding_s += language_info[i]["total_seconds"];
    };
    let nlanguage_info = [...language_info];
    
    // if the share is less than min_percent put it with the others against pollution
    let tmp_others = {"name": "Others", "total_seconds": 0.0, "label_point": [0, 0]};
    for (let pos=0; pos<language_info.length; pos++) {
        let lang = language_info[pos];
        if (lang["total_seconds"] / total_coding_s < min_percent) {
            tmp_others["total_seconds"] += nlanguage_info.splice(nlanguage_info.indexOf(lang), 1)[0]["total_seconds"];
        } else {
            nlanguage_info[language_info.indexOf(lang)]["label_point"] = [0, 0];
        };
    };
    language_info = [...nlanguage_info];
    language_info.push(tmp_others);
    let last_index = language_info.length-1;
    language_info[last_index]["text"] = `${Math.floor(language_info[last_index]["total_seconds"]/3600)} hrs ${Math.floor((language_info[last_index]["total_seconds"] % 3600) / 60)} mins`
    language_info = language_info.sort((i1, i2) => {return i1["total_seconds"]>i2["total_seconds"] ? -1 : 1});
    
    for (let lang_num=0; lang_num < language_info.length; lang_num++) {
        let lang_info = language_info[lang_num];
        current_s += lang_info["total_seconds"];
        angle = current_s / total_coding_s * max_angle;
        let offset_angle = angle + start_angle_pi;
        let offset_old_angle = old_angle + start_angle_pi;

        // draw the inner parts
        for (let tmp_angle=Math.floor(offset_old_angle); tmp_angle < Math.floor(offset_angle); tmp_angle++) {
            for (let dist=0; dist < Math.floor(radius); dist+=0.2) {
                let c = [Math.cos(tmp_angle / 50) * dist, Math.sin(tmp_angle / 50) * dist];
                let nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
                circle_array[nc[1]][nc[0]] = graph_chars[lang_num];
            };
        };

        if (language_info.length > 1) {
            for (let i=0; i<2; i++) {
                let tmp_angle = [Math.floor(offset_old_angle), Math.floor(offset_angle)][i];
                for (let dist=0; dist < Math.floor(radius); dist+=0.2) {
                    let c = [Math.cos(tmp_angle / 50) * dist, Math.sin(tmp_angle / 50) * dist];
                    let nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
                    circle_array[nc[1]][nc[0]] = border;
                };
            };
        };

        if (labels) {
            let label_angle = offset_old_angle + (offset_angle - offset_old_angle) / 2;
            // the middle of the inner area
            if (language_info.length == 1) {
                coords = origin;
            } else {
                let c = [Math.cos(label_angle / 50) * radius, Math.sin(label_angle / 50) * radius];
                let nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
                coords = [origin[0] + (nc[0] - origin[0]) / 2, origin[1] + (nc[1] - origin[1]) / 2];
            };

            language_info[lang_num]["label_point"] = coords;
            language_info[lang_num]["label_angle"] = label_angle;

            let nangle = label_angle / 50;
            circle_array[Math.floor(coords[1])][Math.floor(coords[0])] = label_marker;

            let c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
            let label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];

            // for the snap effect when the label goes out of the screen
            while ((circle_array.length - min_labels_y) <= Math.floor(label_coords[1]) || Math.floor(label_coords[1]) <= min_labels_y) {
                if (coords[1] < origin[1]) {
                    if (coords[0] < origin[0]) {
                        nangle -= 0.1;
                    } else {
                        nangle += 0.1;
                    }
                } else {
                    if (coords[0] < origin[0]) {
                        nangle += 0.1;
                    } else {
                        nangle -= 0.1;
                    };
                };

                c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
                label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
            };
            point_offset = (Math.floor(label_coords[0])-Math.floor(coords[0])**2+(Math.floor(label_coords[1])-Math.floor(coords[1]))**2)**0.5;
            language_info[lang_num]["distance"] = point_offset;
        };

        old_angle = angle;
    };

    // the edge (circle)
    for (let angle=0; angle < Math.PI*200; angle++) {
        let c = [Math.cos(angle) * radius, Math.sin(angle) * radius];
        let nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];

        // edges
        for (let i=0; i < edge_width; i++) {
            for (let j=0; j < Math.floor(edge_width * x_stretch); j++) {
                circle_array[nc[1]+i-Math.floor(edge_width/2)][nc[0]+j-Math.floor(edge_width/2)] = edge;
            };
        };
    };

    // labels
    if (labels) {
        let label_store = [];
        //language_info = language_info.sort((i1, i2) => {i1["distance"]<=i2["distance"]})
        language_info = language_info.sort((i1, i2) => {return i1["distance"]<=i2["distance"] ? 1 : -1})
        for (let lang_num=0; lang_num < language_info.length; lang_num++) {
            let lang_info = language_info[lang_num];

            let coords = lang_info["label_point"];
            let nangle = lang_info["label_angle"] / 50;

            let c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
            let label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];

            // for the snap effect when the label goes out of the screen
            let isNotValid = false;
            let i;
            for (i=0; i < label_store.length; i++) {
                let x = label_store[i];
                if (Math.abs(Math.floor(x[1])-Math.floor(label_coords[1])) < min_labels_y_dist && Math.abs(Math.floor(x[0])-Math.floor(label_coords[0])) < min_labels_x_dist) {
                    isNotValid = true;
                    break;
                }
            };
            while (isNotValid || (circle_array.length - min_labels_y) <= Math.floor(label_coords[1]) || Math.floor(label_coords[1]) <= min_labels_y) {
                isNotValid = false;
                if (coords[1] < origin[1]) {
                    if (coords[0] < origin[0]) {
                        nangle -= 0.1;
                    } else {
                        nangle += 0.1;
                    }
                } else {
                    if (coords[0] < origin[0]) {
                        nangle += 0.1;
                    } else {
                        nangle -= 0.1;
                    };
                };

                c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
                label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
                
                for (i=0; i < label_store.length; i++) {
                    let x = label_store[i];
                    if (Math.abs(Math.floor(x[1])-Math.floor(label_coords[1])) < min_labels_y_dist && Math.abs(Math.floor(x[0])-Math.floor(label_coords[0])) < min_labels_x_dist) {
                        isNotValid = true;
                        break;
                    }
                };
            };
            point_offset = Math.ceil(((Math.floor(label_coords[0])-Math.floor(coords[0]))**2+(Math.floor(label_coords[1])-Math.floor(coords[1]))**2)**0.5);
            nangle = Math.atan2(Math.floor(coords[1])-Math.floor(label_coords[1]), Math.floor(coords[0])-Math.floor(label_coords[0])) + Math.PI;
            label_store.push(label_coords);

            // displaying the labels and lines happens here 
            // ignore the yandere dev code, because there are subtle change like + and -
            if (label_coords[1] < origin[1]) {
                if (coords[0] < origin[0]) {
                    if (label_lines) {
                        for (let i=0; i < point_offset; i+=0.2) {
                            c = [Math.cos(nangle) * i, Math.sin(nangle) * i];
                            let nc = [Math.floor(c[0] + origin[0] + (coords[0]-origin[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[0];
                        };
                    };
                    let upper_label = reverseString(lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0)));
                    let lower_label = reverseString(lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0)));
                    for (let pos=0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])-1][Math.floor(label_coords[0])-pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])-pos] = label_seperator;
                    };
                    for (let pos=0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])+1][Math.floor(label_coords[0])-pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])-pos] = label_seperator;
                    };
                } else {
                    if (label_lines) {
                        for (let i=0; i < point_offset; i+=0.2) {
                            c = [Math.cos(nangle) * i, Math.sin(nangle) * i];
                            let nc = [Math.floor(c[0] + origin[0] + (coords[0]-origin[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[1];
                        };
                    };
                    let upper_label = bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0)) + lang_info["name"];
                    let lower_label = bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0)) + lang_info["text"];
                    for (let pos=0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])-1][Math.floor(label_coords[0])+pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])+pos] = label_seperator;
                    };
                    for (let pos=0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])+1][Math.floor(label_coords[0])+pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])+pos] = label_seperator;
                    };
                };
            } else {
                if (coords[0] < origin[0]) {
                    if (label_lines) {
                        for (let i=0; i < point_offset; i+=0.2) {
                            c = [Math.cos(nangle) * i, Math.sin(nangle) * i];
                            let nc = [Math.floor(c[0] + origin[0] - (origin[0]-coords[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[1];
                        };
                    };
                    let upper_label = reverseString(lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0)));
                    let lower_label = reverseString(lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0)));
                    for (let pos=0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])-1][Math.floor(label_coords[0])-pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])-pos] = label_seperator;
                    };
                    for (let pos=0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])+1][Math.floor(label_coords[0])-pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])-pos] = label_seperator;
                    };
                } else {
                    if (label_lines) {
                        for (let i=0; i < point_offset; i+=0.2) {
                            c = [Math.cos(nangle) * i, Math.sin(nangle) * i];
                            let nc = [Math.floor(c[0] + origin[0] - (origin[0]-coords[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[0];
                        };
                    };
                    let upper_label = bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0)) + lang_info["name"];
                    let lower_label = bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0)) + lang_info["text"];
                    for (let pos=0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])-1][Math.floor(label_coords[0])+pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])+pos] = label_seperator;
                    };
                    for (let pos=0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1])+1][Math.floor(label_coords[0])+pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0])+pos] = label_seperator;
                    };
                };
            };
            circle_array[Math.floor(coords[1])][Math.floor(coords[0])] = label_marker;
        };
    };

    let ret_arr = [];
    for (let y=0; y<circle_array.length; y++) {
        ret_arr.push(circle_array[y].join(""));
    };

    return ret_arr.join("\n");
}