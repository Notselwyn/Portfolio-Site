"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.circleGraph = void 0;
function reverseString(str) {
    return str.split("").reverse().join("");
}
function circleGraph(language_info, edge_width, diameter, x_stretch, min_percent, edge, border, bg, graph_chars, labels, label_offset, label_width, start_angle, min_labels_x_dist, min_labels_y_dist, min_labels_x, min_labels_y, label_marker, label_seperator, label_line, label_lines, total_time) {
    var radius = diameter / 2;
    var label_tot = (label_offset + label_width);
    var circle_array = [];
    for (var y = 0; y < Math.floor(radius * 2 + edge_width * 2); y++) {
        circle_array.push([]);
        for (var x = 0; x < Math.floor((radius * 2 + edge_width * 2 + label_tot * 2) * x_stretch); x++) {
            circle_array[y].push(bg);
        }
        ;
    }
    ;
    var total_coding_s = 0;
    var current_s = 0;
    var rad_p_width = edge_width + radius;
    var rad_p_laboff = radius + label_offset;
    var origin = [(rad_p_width + label_tot) * x_stretch, rad_p_width];
    var max_angle = Math.PI * 100;
    var start_angle_pi = start_angle / 360 * max_angle;
    var old_angle = 0;
    var angle;
    var coords;
    var point_offset;
    for (var i = 0; i < language_info.length; i++) {
        total_coding_s += language_info[i]["total_seconds"];
    }
    ;
    var nlanguage_info = __spreadArray([], language_info, true);
    // Total hours: x
    if (total_time) {
        var hours_string = "// Total hours: " + (Math.floor(total_coding_s / 3600 * 10) / 10).toString();
        if (diameter * x_stretch > hours_string.length) {
            for (var i = 0; i < hours_string.length; i++) {
                circle_array[1][i] = hours_string[i];
            }
        }
        //for (int i=0; i<)
    }
    // if the share is less than min_percent put it with the others against pollution
    var tmp_others = { "name": "Others", "total_seconds": 0.0, "label_point": [0, 0] };
    for (var pos = 0; pos < language_info.length; pos++) {
        var lang = language_info[pos];
        if (lang["total_seconds"] / total_coding_s < min_percent) {
            tmp_others["total_seconds"] += nlanguage_info.splice(nlanguage_info.indexOf(lang), 1)[0]["total_seconds"];
        }
        else {
            nlanguage_info[language_info.indexOf(lang)]["label_point"] = [0, 0];
        }
        ;
    }
    ;
    language_info = __spreadArray([], nlanguage_info, true);
    language_info.push(tmp_others);
    var last_index = language_info.length - 1;
    language_info[last_index]["text"] = Math.floor(language_info[last_index]["total_seconds"] / 3600) + " hrs " + Math.floor((language_info[last_index]["total_seconds"] % 3600) / 60) + " mins";
    language_info = language_info.sort(function (i1, i2) { return i1["total_seconds"] > i2["total_seconds"] ? -1 : 1; });
    for (var lang_num = 0; lang_num < language_info.length; lang_num++) {
        var lang_info = language_info[lang_num];
        current_s += lang_info["total_seconds"];
        angle = current_s / total_coding_s * max_angle;
        var offset_angle = angle + start_angle_pi;
        var offset_old_angle = old_angle + start_angle_pi;
        // draw the inner parts
        for (var tmp_angle = Math.floor(offset_old_angle); tmp_angle < Math.floor(offset_angle); tmp_angle++) {
            for (var dist = 0; dist < Math.floor(radius); dist += 0.2) {
                var c = [Math.cos(tmp_angle / 50) * dist, Math.sin(tmp_angle / 50) * dist];
                var nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
                circle_array[nc[1]][nc[0]] = graph_chars[lang_num];
            }
            ;
        }
        ;
        if (language_info.length > 1) {
            for (var i = 0; i < 2; i++) {
                var tmp_angle = [Math.floor(offset_old_angle), Math.floor(offset_angle)][i];
                for (var dist = 0; dist < Math.floor(radius); dist += 0.2) {
                    var c = [Math.cos(tmp_angle / 50) * dist, Math.sin(tmp_angle / 50) * dist];
                    var nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
                    circle_array[nc[1]][nc[0]] = border;
                }
                ;
            }
            ;
        }
        ;
        if (labels) {
            var label_angle = offset_old_angle + (offset_angle - offset_old_angle) / 2;
            // the middle of the inner area
            if (language_info.length == 1) {
                coords = origin;
            }
            else {
                var c_1 = [Math.cos(label_angle / 50) * radius, Math.sin(label_angle / 50) * radius];
                var nc = [Math.floor(c_1[0] * x_stretch + origin[0]), Math.floor(c_1[1] + origin[1])];
                coords = [origin[0] + (nc[0] - origin[0]) / 2, origin[1] + (nc[1] - origin[1]) / 2];
            }
            ;
            language_info[lang_num]["label_point"] = coords;
            language_info[lang_num]["label_angle"] = label_angle;
            var nangle = label_angle / 50;
            circle_array[Math.floor(coords[1])][Math.floor(coords[0])] = label_marker;
            var c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
            var label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
            // for the snap effect when the label goes out of the screen
            while ((circle_array.length - min_labels_y) <= Math.floor(label_coords[1]) || Math.floor(label_coords[1]) <= min_labels_y) {
                if (coords[1] < origin[1]) {
                    if (coords[0] < origin[0]) {
                        nangle -= 0.1;
                    }
                    else {
                        nangle += 0.1;
                    }
                }
                else {
                    if (coords[0] < origin[0]) {
                        nangle += 0.1;
                    }
                    else {
                        nangle -= 0.1;
                    }
                    ;
                }
                ;
                c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
                label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
            }
            ;
            point_offset = Math.pow((Math.floor(label_coords[0]) - Math.pow(Math.floor(coords[0]), 2) + Math.pow((Math.floor(label_coords[1]) - Math.floor(coords[1])), 2)), 0.5);
            language_info[lang_num]["distance"] = point_offset;
        }
        ;
        old_angle = angle;
    }
    ;
    // the edge (circle)
    for (var angle_1 = 0; angle_1 < Math.PI * 200; angle_1++) {
        var c = [Math.cos(angle_1) * radius, Math.sin(angle_1) * radius];
        var nc = [Math.floor(c[0] * x_stretch + origin[0]), Math.floor(c[1] + origin[1])];
        // edges
        for (var i = 0; i < edge_width; i++) {
            for (var j = 0; j < Math.floor(edge_width * x_stretch); j++) {
                circle_array[nc[1] + i - Math.floor(edge_width / 2)][nc[0] + j - Math.floor(edge_width / 2)] = edge;
            }
            ;
        }
        ;
    }
    ;
    // labels
    if (labels) {
        var label_store = [];
        //language_info = language_info.sort((i1, i2) => {i1["distance"]<=i2["distance"]})
        language_info = language_info.sort(function (i1, i2) { return i1["distance"] <= i2["distance"] ? 1 : -1; });
        for (var lang_num = 0; lang_num < language_info.length; lang_num++) {
            var lang_info = language_info[lang_num];
            var coords_1 = lang_info["label_point"];
            var nangle = lang_info["label_angle"] / 50;
            var c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
            var label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
            // for the snap effect when the label goes out of the screen
            var isNotValid = false;
            var i = void 0;
            for (i = 0; i < label_store.length; i++) {
                var x = label_store[i];
                if (Math.abs(Math.floor(x[1]) - Math.floor(label_coords[1])) < min_labels_y_dist && Math.abs(Math.floor(x[0]) - Math.floor(label_coords[0])) < min_labels_x_dist) {
                    isNotValid = true;
                    break;
                }
            }
            ;
            while (isNotValid || (circle_array.length - min_labels_y) <= Math.floor(label_coords[1]) || Math.floor(label_coords[1]) <= min_labels_y) {
                isNotValid = false;
                if (coords_1[1] < origin[1]) {
                    if (coords_1[0] < origin[0]) {
                        nangle -= 0.1;
                    }
                    else {
                        nangle += 0.1;
                    }
                }
                else {
                    if (coords_1[0] < origin[0]) {
                        nangle += 0.1;
                    }
                    else {
                        nangle -= 0.1;
                    }
                    ;
                }
                ;
                c = [Math.cos(nangle) * rad_p_laboff, Math.sin(nangle) * rad_p_laboff];
                label_coords = [c[0] * x_stretch + origin[0], c[1] + origin[1]];
                for (i = 0; i < label_store.length; i++) {
                    var x = label_store[i];
                    if (Math.abs(Math.floor(x[1]) - Math.floor(label_coords[1])) < min_labels_y_dist && Math.abs(Math.floor(x[0]) - Math.floor(label_coords[0])) < min_labels_x_dist) {
                        isNotValid = true;
                        break;
                    }
                }
                ;
            }
            ;
            point_offset = Math.ceil(Math.pow((Math.pow((Math.floor(label_coords[0]) - Math.floor(coords_1[0])), 2) + Math.pow((Math.floor(label_coords[1]) - Math.floor(coords_1[1])), 2)), 0.5));
            nangle = Math.atan2(Math.floor(coords_1[1]) - Math.floor(label_coords[1]), Math.floor(coords_1[0]) - Math.floor(label_coords[0])) + Math.PI;
            label_store.push(label_coords);
            // displaying the labels and lines happens here 
            // ignore the yandere dev code, because there are subtle change like + and -
            if (label_coords[1] < origin[1]) {
                if (coords_1[0] < origin[0]) {
                    if (label_lines) {
                        for (var i_1 = 0; i_1 < point_offset; i_1 += 0.2) {
                            c = [Math.cos(nangle) * i_1, Math.sin(nangle) * i_1];
                            var nc = [Math.floor(c[0] + origin[0] + (coords_1[0] - origin[0])), Math.floor(c[1] + origin[1] + (coords_1[1] - origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[0];
                        }
                        ;
                    }
                    ;
                    var upper_label = reverseString(lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length - lang_info["name"].length) / 2), 0)));
                    var lower_label = reverseString(lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length - lang_info["text"].length) / 2), 0)));
                    for (var pos = 0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) - 1][Math.floor(label_coords[0]) - pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) - pos] = label_seperator;
                    }
                    ;
                    for (var pos = 0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) + 1][Math.floor(label_coords[0]) - pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) - pos] = label_seperator;
                    }
                    ;
                }
                else {
                    if (label_lines) {
                        for (var i_2 = 0; i_2 < point_offset; i_2 += 0.2) {
                            c = [Math.cos(nangle) * i_2, Math.sin(nangle) * i_2];
                            var nc = [Math.floor(c[0] + origin[0] + (coords_1[0] - origin[0])), Math.floor(c[1] + origin[1] + (coords_1[1] - origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[1];
                        }
                        ;
                    }
                    ;
                    var upper_label = bg.repeat(Math.max(Math.floor((lang_info["text"].length - lang_info["name"].length) / 2), 0)) + lang_info["name"];
                    var lower_label = bg.repeat(Math.max(Math.floor((lang_info["name"].length - lang_info["text"].length) / 2), 0)) + lang_info["text"];
                    for (var pos = 0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) - 1][Math.floor(label_coords[0]) + pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) + pos] = label_seperator;
                    }
                    ;
                    for (var pos = 0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) + 1][Math.floor(label_coords[0]) + pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) + pos] = label_seperator;
                    }
                    ;
                }
                ;
            }
            else {
                if (coords_1[0] < origin[0]) {
                    if (label_lines) {
                        for (var i_3 = 0; i_3 < point_offset; i_3 += 0.2) {
                            c = [Math.cos(nangle) * i_3, Math.sin(nangle) * i_3];
                            var nc = [Math.floor(c[0] + origin[0] - (origin[0] - coords_1[0])), Math.floor(c[1] + origin[1] + (coords_1[1] - origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[1];
                        }
                        ;
                    }
                    ;
                    var upper_label = reverseString(lang_info["name"] + bg.repeat(Math.max(Math.floor((lang_info["text"].length - lang_info["name"].length) / 2), 0)));
                    var lower_label = reverseString(lang_info["text"] + bg.repeat(Math.max(Math.floor((lang_info["name"].length - lang_info["text"].length) / 2), 0)));
                    for (var pos = 0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) - 1][Math.floor(label_coords[0]) - pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) - pos] = label_seperator;
                    }
                    ;
                    for (var pos = 0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) + 1][Math.floor(label_coords[0]) - pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) - pos] = label_seperator;
                    }
                    ;
                }
                else {
                    if (label_lines) {
                        for (var i_4 = 0; i_4 < point_offset; i_4 += 0.2) {
                            c = [Math.cos(nangle) * i_4, Math.sin(nangle) * i_4];
                            var nc = [Math.floor(c[0] + origin[0] - (origin[0] - coords_1[0])), Math.floor(c[1] + origin[1] + (coords_1[1] - origin[1]))];
                            circle_array[nc[1]][nc[0]] = label_line[0];
                        }
                        ;
                    }
                    ;
                    var upper_label = bg.repeat(Math.max(Math.floor((lang_info["text"].length - lang_info["name"].length) / 2), 0)) + lang_info["name"];
                    var lower_label = bg.repeat(Math.max(Math.floor((lang_info["name"].length - lang_info["text"].length) / 2), 0)) + lang_info["text"];
                    for (var pos = 0; pos < upper_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) - 1][Math.floor(label_coords[0]) + pos] = upper_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) + pos] = label_seperator;
                    }
                    ;
                    for (var pos = 0; pos < lower_label.length; pos++) {
                        circle_array[Math.floor(label_coords[1]) + 1][Math.floor(label_coords[0]) + pos] = lower_label[pos];
                        circle_array[Math.floor(label_coords[1])][Math.floor(label_coords[0]) + pos] = label_seperator;
                    }
                    ;
                }
                ;
            }
            ;
            circle_array[Math.floor(coords_1[1])][Math.floor(coords_1[0])] = label_marker;
        }
        ;
    }
    ;
    var ret_arr = [];
    for (var y = 0; y < circle_array.length; y++) {
        ret_arr.push(circle_array[y].join(""));
    }
    ;
    return ret_arr.join("\n");
}
exports.circleGraph = circleGraph;
