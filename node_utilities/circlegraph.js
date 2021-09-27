String.prototype.reverse = function() {
    return this.split("").reverse().join("");
}

function circleGraph(language_info, edge_width, diameter, x_stretch, min_percent, 
    edge, border, bg, graph_chars, labels, label_offset, label_width, start_angle, 
    min_labels_x_dist, min_labels_y_dist, min_labels_x, min_labels_y, label_marker, 
    label_seperator, label_line, label_lines) {

    let radius = diameter / 2;
    let label_tot = (label_offset + label_width);
    let circle_array = [];
    for (let y=0; y<parseInt(radius*2 + edge_width*2); y++) {
        circle_array.push([]);
        for (let x=0; x<parseInt((radius*2 + edge_width*2 + label_tot*2)*x_stretch); x++) {
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
    nlanguage_info = [...language_info];
    
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
    language_info[last_index]["text"] = `${parseInt(language_info[last_index]["total_seconds"]/3600)} hrs ${parseInt((language_info[last_index]["total_seconds"] % 3600) / 60)} mins`
    language_info = language_info.sort((i1, i2) => {i1["total_seconds"]>i2["total_seconds"]})
    
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
                        nangle -= 0.01;
                    } else {
                        nangle += 0.01;
                    }
                } else {
                    if (coords[0] < origin[0]) {
                        nangle += 0.01;
                    } else {
                        nangle -= 0.01;
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
        language_info = language_info.sort((i1, i2) => {i1["distance"]<=i2["distance"]})
        for (let lang_num=0; lang_num < language_info.length; lang_num++) {
            let lang_info = language_info[lang_num];

            let coords = lang_info["label_point"];
            let nangle = lang_info["label_angle"] / 50;
            circle_array[Math.floor(coords[1])][Math.floor(coords[0])] = label_marker;

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
                        nangle -= 0.01;
                    } else {
                        nangle += 0.01;
                    }
                } else {
                    if (coords[0] < origin[0]) {
                        nangle += 0.01;
                    } else {
                        nangle -= 0.01;
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
                            nc = [Math.floor(c[0] + origin[0] + (coords[0]-origin[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            if (nc != [Math.floor(coords[0]), Math.floor(coords[1])]) {
                                circle_array[nc[1]][nc[0]] = label_line[0];
                            };
                        };
                    };
                    let upper_label = (lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0))).reverse();
                    let lower_label = (lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0))).reverse();
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
                            nc = [Math.floor(c[0] + origin[0] + (coords[0]-origin[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            if (nc != [Math.floor(coords[0]), Math.floor(coords[1])]) {
                                circle_array[nc[1]][nc[0]] = label_line[1];
                            };
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
                            nc = [Math.floor(c[0] + origin[0] - (origin[0]-coords[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            if (nc != [Math.floor(coords[0]), Math.floor(coords[1])]) {
                                circle_array[nc[1]][nc[0]] = label_line[1];
                            };
                        };
                    };
                    let upper_label = (lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length-lang_info["name"].length) / 2), 0))).reverse();
                    let lower_label = (lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length-lang_info["text"].length) / 2), 0))).reverse();
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
                            nc = [Math.floor(c[0] + origin[0] - (origin[0]-coords[0])), Math.floor(c[1] + origin[1] + (coords[1]-origin[1]))];
                            if (nc != [Math.floor(coords[0]), Math.floor(coords[1])]) {
                                circle_array[nc[1]][nc[0]] = label_line[0];
                            };
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
                }
            }
        };
    };

    let ret_arr = [];
    for (let y=0; y<circle_array.length; y++) {
        ret_arr.push(circle_array[y].join(""));
    };

    return ret_arr.join("\n");
}

//let username = "notselwyn";
//let edge_width = 1;
//let diameter = 18;
//let x_stretch = 2.4;
//let min_percent = 0.07;
//let edge = "#";
//let border = "~";
//let bg = " ";
//let graph_chars = " .'`,!+_-?][}{1)(|\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$";
//let labels = true;
//let label_offset = 4;
//let label_width = 5;
//let start_angle = 47;
//let min_labels_x_dist = 20;
//let min_labels_y_dist = 4;
//let min_labels_x = 2;
//let min_labels_y = 2;
//let label_marker = "#";
//let label_seperator = "-";
//let label_line = "\\/";
//let label_lines = true;
//let debug_letters = false;
//let wakatime_data = {'data': {'categories': [{'decimal': '150.73', 'digital': '150:44', 'hours': 150, 'minutes': 44, 'name': 'Coding', 'percent': 99.58, 'text': '150 hrs 44 mins', 'total_seconds': 542646.231768}, {'decimal': '0.45', 'digital': '0:27', 'hours': 0, 'minutes': 27, 'name': 'Debugging', 'percent': 0.3, 'text': '27 mins', 'total_seconds': 1643.018442}, {'decimal': '0.17', 'digital': '0:10', 'hours': 0, 'minutes': 10, 'name': 'Building', 'percent': 0.11, 'text': '10 mins', 'total_seconds': 619.29261}], 'daily_average': 8007, 'daily_average_including_other_language': 8013, 'days_including_holidays': 124, 'days_minus_holidays': 68, 'editors': [{'decimal': '55.28', 'digital': '55:17', 'hours': 55, 'minutes': 17, 'name': 'PyCharmEdu', 'percent': 36.53, 'text': '55 hrs 17 mins', 'total_seconds': 199069.632292}, {'decimal': '35.10', 'digital': '35:06', 'hours': 35, 'minutes': 6, 'name': 'WebStorm', 'percent': 23.2, 'text': '35 hrs 6 mins', 'total_seconds': 126391.732}, {'decimal': '26.52', 'digital': '26:31', 'hours': 26, 'minutes': 31, 'name': 'VS Code', 'percent': 17.53, 'text': '26 hrs 31 mins', 'total_seconds': 95516.850973}, {'decimal': '20.83', 'digital': '20:50', 'hours': 20, 'minutes': 50, 'name': 'Visual Studio', 'percent': 13.77, 'text': '20 hrs 50 mins', 'total_seconds': 75046.89141}, {'decimal': '7.48', 'digital': '7:29', 'hours': 7, 'minutes': 29, 'name': 'GoLand', 'percent': 4.95, 'text': '7 hrs 29 mins', 'total_seconds': 26996.588145}, {'decimal': '6.07', 'digital': '6:04', 'hours': 6, 'minutes': 4, 'name': 'CLion', 'percent': 4.02, 'text': '6 hrs 4 mins', 'total_seconds': 21886.848}], 'holidays': 56, 'human_readable_daily_average': '2 hrs 13 mins', 'human_readable_daily_average_including_other_language': '2 hrs 13 mins', 'human_readable_range': 'since May 26 2021', 'human_readable_total': '151 hrs 14 mins', 'human_readable_total_including_other_language': '151 hrs 21 mins', 'id': '665cd14d-a7f0-413e-b9af-4999bb0c60ca', 'is_already_updating': false, 'is_coding_activity_visible': true, 'is_including_today': false, 'is_other_usage_visible': true, 'is_stuck': false, 'is_up_to_date': true, 'languages': [{'decimal': '57.67', 'digital': '57:40', 'hours': 57, 'minutes': 40, 'name': 'Python', 'percent': 38.1, 'text': '57 hrs 40 mins', 'total_seconds': 207626.012992}, {'decimal': '26.70', 'digital': '26:42', 'hours': 26, 'minutes': 42, 'name': 'C++', 'percent': 17.64, 'text': '26 hrs 42 mins', 'total_seconds': 96126.286422}, {'decimal': '23.63', 'digital': '23:38', 'hours': 23, 'minutes': 38, 'name': 'JavaScript', 'percent': 15.62, 'text': '23 hrs 38 mins', 'total_seconds': 85093.63197}, {'decimal': '10.70', 'digital': '10:42', 'hours': 10, 'minutes': 42, 'name': 'Pug', 'percent': 7.07, 'text': '10 hrs 42 mins', 'total_seconds': 38525.292081}, {'decimal': '10.33', 'digital': '10:20', 'hours': 10, 'minutes': 20, 'name': 'CSS', 'percent': 6.83, 'text': '10 hrs 20 mins', 'total_seconds': 37209.907282}, {'decimal': '8.27', 'digital': '8:16', 'hours': 8, 'minutes': 16, 'name': 'HTML', 'percent': 5.47, 'text': '8 hrs 16 mins', 'total_seconds': 29790.388498}, {'decimal': '7.42', 'digital': '7:25', 'hours': 7, 'minutes': 25, 'name': 'Go', 'percent': 4.91, 'text': '7 hrs 25 mins', 'total_seconds': 26731.471145}, {'decimal': '2.52', 'digital': '2:31', 'hours': 2, 'minutes': 31, 'name': 'Text', 'percent': 1.66, 'text': '2 hrs 31 mins', 'total_seconds': 9068.063513}, {'decimal': '1.73', 'digital': '1:44', 'hours': 1, 'minutes': 44, 'name': 'TypeScript', 'percent': 1.15, 'text': '1 hr 44 mins', 'total_seconds': 6280.903823}, {'decimal': '0.62', 'digital': '0:37', 'hours': 0, 'minutes': 37, 'name': 'JSON', 'percent': 0.41, 'text': '37 mins', 'total_seconds': 2241.807647}, {'decimal': '0.58', 'digital': '0:35', 'hours': 0, 'minutes': 35, 'name': 'Git Config', 'percent': 0.39, 'text': '35 mins', 'total_seconds': 2147.903026}, {'decimal': '0.55', 'digital': '0:33', 'hours': 0, 'minutes': 33, 'name': 'C', 'percent': 0.36, 'text': '33 mins', 'total_seconds': 1981.967263}, {'decimal': '0.18', 'digital': '0:11', 'hours': 0, 'minutes': 11, 'name': 'CMake', 'percent': 0.12, 'text': '11 mins', 'total_seconds': 665.98}, {'decimal': '0.12', 'digital': '0:07', 'hours': 0, 'minutes': 7, 'name': 'Other', 'percent': 0.08, 'text': '7 mins', 'total_seconds': 462.705303}, {'decimal': '0.08', 'digital': '0:05', 'hours': 0, 'minutes': 5, 'name': 'PHP', 'percent': 0.06, 'text': '5 mins', 'total_seconds': 317.195}, {'decimal': '0.07', 'digital': '0:04', 'hours': 0, 'minutes': 4, 'name': 'Markdown', 'percent': 0.05, 'text': '4 mins', 'total_seconds': 275.028177}, {'decimal': '0.03', 'digital': '0:02', 'hours': 0, 'minutes': 2, 'name': 'QML', 'percent': 0.02, 'text': '2 mins', 'total_seconds': 120.570958}, {'decimal': '0.02', 'digital': '0:01', 'hours': 0, 'minutes': 1, 'name': 'CSV', 'percent': 0.01, 'text': '1 min', 'total_seconds': 80.636}, {'decimal': '0.02', 'digital': '0:01', 'hours': 0, 'minutes': 1, 'name': 'Objective-C', 'percent': 0.01, 'text': '1 min', 'total_seconds': 73.371267}, {'decimal': '0.00', 'digital': '0:00', 'hours': 0, 'minutes': 0, 'name': 'Batchfile', 'percent': 0.01, 'text': '0 secs', 'total_seconds': 51.007}, {'decimal': '0.00', 'digital': '0:00', 'hours': 0, 'minutes': 0, 'name': 'Bash', 'percent': 0.01, 'text': '0 secs', 'total_seconds': 32.145886}, {'decimal': '0.00', 'digital': '0:00', 'hours': 0, 'minutes': 0, 'name': 'Prolog', 'percent': 0.0, 'text': '0 secs', 'total_seconds': 6.267567}], 'operating_systems': [{'decimal': '147.55', 'digital': '147:33', 'hours': 147, 'minutes': 33, 'name': 'Windows', 'percent': 97.49, 'text': '147 hrs 33 mins', 'total_seconds': 531238.979731}, {'decimal': '3.78', 'digital': '3:47', 'hours': 3, 'minutes': 47, 'name': 'Linux', 'percent': 2.51, 'text': '3 hrs 47 mins', 'total_seconds': 13669.563089}], 'percent_calculated': 100, 'range': 'all_time', 'status': 'ok', 'timeout': 15, 'total_seconds': 544445.837517, 'total_seconds_including_other_language': 544908.54282, 'user_id': '695a043d-dc3e-4007-8e36-733e0b6c423f', 'username': 'notselwyn', 'writes_only': false}}
//
//console.clear()
//console.log(circleGraph(wakatime_data, edge_width, diameter, x_stretch, min_percent, 
//    edge, border, bg, graph_chars, labels, label_offset, label_width, start_angle, 
//    min_labels_x_dist, min_labels_y_dist, min_labels_x, min_labels_y, label_marker, 
//    label_seperator, label_line, label_lines));

module.exports = {
    circleGraph: circleGraph,
};