var appendParameter = function (data, parameter, value) {
    if (!isNullOrWhiteSpace(data)) {
        data += ",";
    };

    if (value === undefined) {
        value = "";
    };

    data += JSON.stringify(parameter) + ':' + JSON.stringify(value);

    return data;
};

var getData = function (data) {
    if (data) {
        return "{" + data + "}";
    };

    return null;
};



var getAjax = function (url, data) {
    var ajax;

    if (data) {
        ajax = $.ajax({
            type: "POST",
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    } else {
        ajax = $.ajax({
            type: "POST",
            url: url,
            data: "{}",
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };

    ajax.fail(function(xhr) {
        logAjaxErrorMessage(xhr);
    });

    return ajax;
};

var getAjaxRequest = function (url, type, data, bodyPost) {
    if (!type) {
        type = "GET";
    };

    var ajax;

    if (type === "POST" && bodyPost) {
        ajax = $.post(url, { '': data });
    } else {
        ajax = $.ajax({
            type: type,
            url: url,
            data: data,
            contentType: "application/json; charset=utf-8",
            dataType: "json"
        });
    };


    ajax.fail(function (xhr) {
        if(window.displayMessage){
            displayMessage(getAjaxErrorMessage(xhr));            
        };
    });

    return ajax;
};

var ajaxUpdateVal = function (url, data, targetControls) {
    var ajax;

    if (data) {
        ajax = getAjax(url, data);
    } else {
        ajax = getAjax(url);
    };

    ajax.success(function (msg) {
        targetControls.each(function () {
            $(this).val(msg.d).trigger('change');
        });

        if (typeof window.ajaxUpdateValCallback == "function") {
            window.ajaxUpdateValCallback(targetControls);
        };
    });

    ajax.error(function (xhr) {
        logAjaxErrorMessage(xhr);
    });
};

jQuery.fn.bindAjaxData = function (ajaxData, skipSelect, selectedValue, keyField, valueField, isArray) {
    "use strict";
    function appendItem(dropDownList, value, text, selected) {
        var option = $("<option></option>");
        option.val(value).html(text).trigger('change');

        if (selected) {
            option.attr("selected", true);
        };

        dropDownList.append(option);
    };

    var selected;

    var targetControl = $(this);
    targetControl.empty();


    if (ajaxData.length === 0) {
        appendItem(targetControl, "", window.Resources.Titles.None());
        return;
    };

    if (!skipSelect) {
        appendItem(targetControl, "", window.Resources.Titles.Select());
    };

    if (!keyField) {
        keyField = "Value";
    };

    if (!valueField) {
        valueField = "Text";
    };

    var valueIsExpression = keyField.substring(2, 0) === "{{" && keyField.slice(-2) === "}}";
    var textIsExpression = valueField.substring(2, 0) === "{{" && valueField.slice(-2) === "}}";

    $.each(ajaxData, function () {
        var text;
        var value;
        selected = false;

        if (typeof (isArray) === "undefined") {
            isArray = false;
        };

        if (isArray) {
            text = this;
            value = this;
        };

        if (!isArray) {
            var expression;

            if (textIsExpression) {
                expression = valueField.replace("{{", "").replace("}}", "");
                text = eval(expression);
            } else {
                text = this[valueField].toString();
            };

            if (valueIsExpression) {
                expression = keyField.replace("{{", "").replace("}}", "");
                value = eval(expression);
            } else {
                value = this[keyField].toString();
            };
        };

        if (selectedValue) {
            if (value === selectedValue.toString()) {
                selected = true;
            };
        };

        appendItem(targetControl, value, text, selected);
    });
};

var ajaxDataBind = function (url, targetControl, data, selectedValue, associatedControl, callback, keyField, valueField, isArray) {
    function appendItem(dropDownList, value, text, selected) {
        var option = $("<option></option>");
        option.val(value).html(text).trigger('change');

        if (selected) {
            option.attr("selected", true);
        };

        dropDownList.append(option);
    };

    var isWebApiRequest = url.substring(5, 0) === "/api/";
    var isProcedure = url.slice(-7) === "execute";

    if (!targetControl) {
        return;
    };

    if (targetControl.length === 0) {
        return;
    };

    var ajax;

    if (isWebApiRequest) {
        var type = "GET";

        if (isProcedure) {
            type = "POST";
        };

        ajax = new getAjaxRequest(url, type, data);
    } else {
        ajax = new getAjax(url, data);
    };

    ajax.success(function (msg) {
        var result = msg.d;

        if (isWebApiRequest) {
            result = msg;
        };

        if (!result) {
            return;
        };

        if (targetControl.length === 1) {
            targetControl.bindAjaxData(result, false, selectedValue, keyField, valueField, isArray);
        };

        if (targetControl.length > 1) {
            targetControl.each(function () {
                $(this).bindAjaxData(result, false, selectedValue, keyField, valueField, isArray);
            });
        };

        if (associatedControl && associatedControl.val) {
            associatedControl.val(selectedValue).trigger('change');
        };

        if (typeof window.ajaxDataBindCallBack === "function") {
            window.ajaxDataBindCallBack(targetControl);
        };

        if (typeof callback === "function") {
            callback();
        };
    });

    ajax.error(function (xhr) {
        if (typeof callback === "function") {
            callback();
        };

        var err = $.parseJSON(xhr.responseText);
        appendItem(targetControl, 0, err.Message);
    });
};

var getAjaxErrorMessage = function (xhr) {
    if (xhr) {
        var err;

        try {
            if (xhr.statusText) {
                err = xhr.statusText;
            };

            if (xhr.responseText) {
                var response = JSON.parse(xhr.responseText);

                if (response) {
                    if (response.Message) {
                        err = response.Message;
                    };

                    if (response.ExceptionMessage) {
                        err = response.ExceptionMessage;
                    };

                    if (response.InnerException) {
                        err = response.InnerException.Message + " " + response.InnerException.ExceptionMessage;
                    };
                };
            };
        } catch (e) {
            err = xhr.responseText.Message;
        }

        if (err) {
            return err;
        };

        return xhr.responseText;
    }

    return "";
};

function getAjaxColumnFilter(statement, columnName, filterCondition, filtervalue, andValue) {
    var filter = new Object();

    filter.FilterStatement = (statement || "WHERE");
    filter.ColumnName = columnName;
    filter.FilterCondition = filterCondition;
    filter.FilterValue = filtervalue;
    filter.FilterAndValue = andValue;

    return filter;
};

function getAjaxPropertyFilter(statement, propertyName, filterCondition, filtervalue, andValue) {
    var filter = new Object();

    filter.FilterStatement = (statement || "WHERE");
    filter.PropertyName = propertyName;
    filter.FilterCondition = filterCondition;
    filter.FilterValue = filtervalue;
    filter.FilterAndValue = andValue;

    return filter;
};