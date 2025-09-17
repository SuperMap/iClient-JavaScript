
var associatedLatlngName = [resources.text_associatedPoint];
var aimAssociatedLatlngName = [resources.text_associatedViewPoint,resources.text_associatedAimPoint];
var communicationAssociatedLatlngName = [resources.text_associatedSenderPoint,resources.text_associatedReceiverPoint];
var aimPropsName = [resources.text_barkLoop, resources.text_barkTimes, resources.text_barkInterval, resources.text_aimCircleRadius, resources.text_display];

var boomGroup = [resources.text_boom];
var boomPropsName = [resources.text_boomLoop, resources.text_boomTimes, resources.text_display];
var communicationLinkPropsName = [resources.text_moveSpeed, resources.text_display];

var destroyGroup = [resources.text_destroy];
var destroyPropsName = [resources.text_durationTime];
var radarPropsName = [resources.text_scanLoop, resources.text_startAngle, resources.text_scanCycle, resources.text_scanRadarRadius, resources.text_display];
var sectorDetectionPropsName = [resources.text_closingAngle, resources.text_sectorRadius, resources.text_display];

var aimStyleGroup = [resources.text_aim, resources.text_aimCircleStyle, resources.text_aimLineStyle]
var aimStyleName = [resources.text_aimCircleColor, resources.text_aimLineColor, resources.text_aimLineWidth, resources.text_aimLineOpacity, resources.text_dashlineSpace]

var communicationLinkStyleGroup = [resources.option_communication, resources.text_communicationStyle, resources.text_moveLineStyle, resources.text_staticLineStyle];
var communicationLinkStyleName = [resources.text_line_width, resources.text_communicationDashlineSpace, resources.text_moveLineColor, resources.text_moveLineOpacity, resources.text_staticLineColor, resources.text_staticLineOpacity]

var radarStyleGroup = [resources.text_scanRadarName, resources.text_innerCircleStyle, resources.text_outterCircleStyle, resources.text_scanStyle];
var radarStyleName = [resources.text_innerCircleFillColor, resources.text_innerCircleFillOpacity, resources.text_innerBorderColor, resources.text_innerBorderOpacity, resources.text_outerCircleFillColor, resources.text_outerCircleFillOpacity, resources.text_outerCircleBorderColor, resources.text_outerCircleBorderOpacity, resources.text_scanFillColor, resources.text_scanFillOpacity]

var monitoringRadarStyleGroup = [resources.text_monitoringRadarName, resources.text_monitoringRadarStyle, resources.text_targetLineStyle];
var monitoringRadarStyleName = [resources.text_innerMonitoringColor, resources.text_innerMonitoringOpacity, resources.text_outerMonitoringColor, resources.text_outerMonitoringOpacity, resources.text_monitoringRadius,resources.text_monitoringRatio];
var monitoringRadarTargetLine = [resources.text_monitoringRadarLineType, resources.text_monitoringRadarFlowType];

var sectorStyleGroup = [resources.text_sectorDetectionRange, resources.text_scanRadarSectorStyle, resources.text_scanRadarScanStyle]
var sectorDetectionStyleName = [resources.text_scanRadarSectorFillColor, resources.text_scanRadarSectorFillOpacity, resources.text_scanRadarSectorBorderColor, resources.text_scanRadarSectorBorderOpacity, resources.text_scanRadarScanFillColor, resources.text_scanRadarScanFillOpacity, resources.text_scanRadarScanBorderColor,resources.text_scanRadarScanBorderOpacity ];

function collectionSpecialEffectPropertyGridRows(specialEffect) {
    var rows = [];
    var type = specialEffect.getType();
    var latlngBelongToGroup = "";
    switch (type) {
        case SuperMap.Plot.SpecialEffectType.AIM:
            latlngBelongToGroup = aimStyleGroup[0];
            break;
        case SuperMap.Plot.SpecialEffectType.BOOM:
            latlngBelongToGroup = associatedLatlngName[0];
            break;
        case SuperMap.Plot.SpecialEffectType.COMMUNICATIONLINK:
            latlngBelongToGroup = communicationLinkStyleGroup[0];
            break;
        case SuperMap.Plot.SpecialEffectType.SECTORDETECTIONRANGE:
            latlngBelongToGroup = sectorStyleGroup[0];
            break;
        case SuperMap.Plot.SpecialEffectType.DESTROY:
            latlngBelongToGroup = destroyGroup[0];
            break;
        case SuperMap.Plot.SpecialEffectType.SCANRADAR:
            latlngBelongToGroup = radarStyleGroup[0];
            break;
        case SuperMap.Plot.SpecialEffectType.MONITORINGRADAR:
            latlngBelongToGroup = monitoringRadarStyleGroup[0];
            break;
        default:
            break;
    }
    if (type == SuperMap.Plot.SpecialEffectType.AIM) {
        var viewLatlng = new Object();
        viewLatlng.group = latlngBelongToGroup;
        viewLatlng.name = aimAssociatedLatlngName[0];
        viewLatlng.editor = "text";
        viewLatlng.value = "(" + specialEffect.getPosition().view[0].toFixed(2).toString() + ","+ specialEffect.getPosition().view[1].toFixed(2).toString() + ")";
        rows.push(viewLatlng);

        var aimLatLng = new Object();
        aimLatLng.group = latlngBelongToGroup;
        aimLatLng.name = aimAssociatedLatlngName[1];
        aimLatLng.editor = "text";
        aimLatLng.value = "(" + specialEffect.getPosition().aim[0].toFixed(2).toString() + "," + specialEffect.getPosition().aim[1].toFixed(2).toString() + ")";
        rows.push(aimLatLng);
    } else if (type == SuperMap.Plot.SpecialEffectType.COMMUNICATIONLINK) {
        var senderLatLng = new Object();
        senderLatLng.group = latlngBelongToGroup;
        senderLatLng.name = communicationAssociatedLatlngName[0];
        senderLatLng.editor = "text";
        senderLatLng.value = "(" + specialEffect.getPosition().sender.lat.toFixed(2).toString() + "," + specialEffect.getPosition().sender.lng.toFixed(2).toString() + ")";
        rows.push(senderLatLng);

        var receiverLatLng = new Object();
        receiverLatLng.group = latlngBelongToGroup;
        receiverLatLng.name = communicationAssociatedLatlngName[1];
        receiverLatLng.editor = "text";
        receiverLatLng.value = "(" + specialEffect.getPosition().receiver.lat.toFixed(2).toString() + "," + specialEffect.getPosition().receiver.lng.toFixed(2).toString() + ")";
        rows.push(receiverLatLng);

    } else {
        var associateLatLng = new Object();
        associateLatLng.group = latlngBelongToGroup;
        associateLatLng.name = associatedLatlngName[0];
        associateLatLng.editor = "text";
        associateLatLng.value = "(" + specialEffect.getPosition().lat.toFixed(2).toString() + "," + specialEffect.getPosition().lng.toFixed(2).toString() +")";
        rows.push(associateLatLng);
    }

    // var specialEffectId = new Object();
    // specialEffectId.group = specialEffectGroup[0];
    // specialEffectId.name = specialEffectPropsName[0];
    // specialEffectId.editor = "text";
    // specialEffectId.value = specialEffect.uuid;
    // rows.push(specialEffectId);

    // var specialEffectType = new Object();
    // specialEffectType.group = specialEffectGroup[0];
    // specialEffectType.name = specialEffectPropsName[1];
    // specialEffectType.editor = "text";
    // specialEffectType.value = specialEffect.getType();
    // rows.push(specialEffectType);
    switch (type) {
        case SuperMap.Plot.SpecialEffectType.AIM:
            var aimBarkLoop = new Object();
            aimBarkLoop.group = aimStyleGroup[0];
            aimBarkLoop.name = aimPropsName[0];
            aimBarkLoop.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            aimBarkLoop.value = checkboxValueToString(specialEffect.loop);
            rows.push(aimBarkLoop);

            var aimBarkTimes = new Object();
            aimBarkTimes.group = aimStyleGroup[0];
            aimBarkTimes.name = aimPropsName[1];
            aimBarkTimes.editor = "text";
            aimBarkTimes.value = specialEffect.barkTimes;
            rows.push(aimBarkTimes);

            var aimBarkInterval = new Object();
            aimBarkInterval.group = aimStyleGroup[0];
            aimBarkInterval.name = aimPropsName[2];
            aimBarkInterval.editor = "text";
            aimBarkInterval.value = specialEffect.barkInterval;
            rows.push(aimBarkInterval);

            var aimCircleRadius = new Object();
            aimCircleRadius.group = aimStyleGroup[0];
            aimCircleRadius.name = aimPropsName[3];
            aimCircleRadius.editor = "text";
            aimCircleRadius.value = specialEffect.radiusSelfDefine;
            rows.push(aimCircleRadius);

            var aimVisible = new Object();
            aimVisible.group = aimStyleGroup[0];
            aimVisible.name = aimPropsName[4];
            aimVisible.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            aimVisible.value = checkboxValueToString(specialEffect.visible);
            rows.push(aimVisible);

            var aimCircleColor = new Object();
            aimCircleColor.group = aimStyleGroup[1];
            aimCircleColor.name = aimStyleName[0];
            aimCircleColor.editor = "colorpicker";
            aimCircleColor.value = specialEffect.style.aimTargetColor;
            rows.push(aimCircleColor);

            var aimLineColor = new Object();
            aimLineColor.group = aimStyleGroup[2];
            aimLineColor.name = aimStyleName[1];
            aimLineColor.editor = "colorpicker";
            aimLineColor.value = specialEffect.style.aimLineColor;
            rows.push(aimLineColor);

            var aimLineWeight = new Object();
            aimLineWeight.group = aimStyleGroup[2];
            aimLineWeight.name = aimStyleName[2];
            aimLineWeight.editor = "text";
            aimLineWeight.value = specialEffect.style.aimLineWeight;
            rows.push(aimLineWeight);

            var aimLineOpacity = new Object();
            aimLineOpacity.group = aimStyleGroup[2];
            aimLineOpacity.name = aimStyleName[3];
            aimLineOpacity.editor = "text";
            aimLineOpacity.value = specialEffect.style.aimLineOpacity;
            rows.push(aimLineOpacity);

            var aimLineDashArray = new Object();
            aimLineDashArray.group = aimStyleGroup[2];
            aimLineDashArray.name = aimStyleName[4];
            aimLineDashArray.editor = "text";
            aimLineDashArray.value = specialEffect.style.aimLineDashArray;
            rows.push(aimLineDashArray);
            break;
        case SuperMap.Plot.SpecialEffectType.BOOM:
            var boomLoop = new Object();
            boomLoop.group = boomGroup[0];
            boomLoop.name = boomPropsName[0];
            boomLoop.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            boomLoop.value = checkboxValueToString(specialEffect.loop);
            rows.push(boomLoop);

            var boomTimes = new Object();
            boomTimes.group = boomGroup[0];
            boomTimes.name = boomPropsName[1];
            boomTimes.editor = "text";
            boomTimes.value = specialEffect.boomTimes;
            rows.push(boomTimes);

            var boomVisible = new Object();
            boomVisible.group = boomGroup[0];
            boomVisible.name = boomPropsName[2];
            boomVisible.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            boomVisible.value = checkboxValueToString(specialEffect.visible);
            rows.push(boomVisible);
            break;
        case SuperMap.Plot.SpecialEffectType.COMMUNICATIONLINK:
            var moveSpeed = new Object();
            moveSpeed.group = communicationLinkStyleGroup[0];
            moveSpeed.name = communicationLinkPropsName[0];
            moveSpeed.editor = "text";
            moveSpeed.value = specialEffect.dashSpeed;
            rows.push(moveSpeed);

            var communicationLinkVisible = new Object();
            communicationLinkVisible.group = communicationLinkStyleGroup[0];
            communicationLinkVisible.name = communicationLinkPropsName[1];
            communicationLinkVisible.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            communicationLinkVisible.value = checkboxValueToString(specialEffect.visible);
            rows.push(communicationLinkVisible);

            var lineWeight = new Object();
            lineWeight.group = communicationLinkStyleGroup[1];
            lineWeight.name = communicationLinkStyleName[0];
            lineWeight.editor = "text";
            lineWeight.value = specialEffect.style.weight;
            rows.push(lineWeight);

            var dashArray = new Object();
            dashArray.group = communicationLinkStyleGroup[2];
            dashArray.name = communicationLinkStyleName[1];
            dashArray.editor = "text";
            dashArray.value = specialEffect.style.dashArray;
            rows.push(dashArray);

            var movePathColor = new Object();
            movePathColor.group = communicationLinkStyleGroup[2];
            movePathColor.name = communicationLinkStyleName[2];
            movePathColor.editor = "colorpicker";
            movePathColor.value = specialEffect.style.movePathColor;
            rows.push(movePathColor);

            var movePathOpacity = new Object();
            movePathOpacity.group = communicationLinkStyleGroup[2];
            movePathOpacity.name = communicationLinkStyleName[3];
            movePathOpacity.editor = "text";
            movePathOpacity.value = specialEffect.style.movePathOpacity;
            rows.push(movePathOpacity);

            var staticPathColor = new Object();
            staticPathColor.group = communicationLinkStyleGroup[3];
            staticPathColor.name = communicationLinkStyleName[4];
            staticPathColor.editor = "colorpicker";
            staticPathColor.value = specialEffect.style.staticPathColor;
            rows.push(staticPathColor);

            var staticPathOpacity = new Object();
            staticPathOpacity.group = communicationLinkStyleGroup[3];
            staticPathOpacity.name = communicationLinkStyleName[5];
            staticPathOpacity.editor = "text";
            staticPathOpacity.value = specialEffect.style.staticPathOpacity;
            rows.push(staticPathOpacity);
            break;
        case SuperMap.Plot.SpecialEffectType.SECTORDETECTIONRANGE:
            var angle = new Object();
            angle.group = sectorStyleGroup[0];
            angle.name = sectorDetectionPropsName[0];
            angle.editor = "text";
            angle.value = specialEffect.angle * 180 / Math.PI;
            rows.push(angle);

            var radius = new Object();
            radius.group = sectorStyleGroup[0];
            radius.name = sectorDetectionPropsName[1];
            radius.editor = "text";
            radius.value = specialEffect.radiusSelfDefine;
            rows.push(radius);

            var sectorVisible = new Object();
            sectorVisible.group = sectorStyleGroup[0];
            sectorVisible.name = sectorDetectionPropsName[2];
            sectorVisible.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            sectorVisible.value = checkboxValueToString(specialEffect.visible);
            rows.push(sectorVisible);

            var sectorFillColor = new Object();
            sectorFillColor.group = sectorStyleGroup[1];
            sectorFillColor.name = sectorDetectionStyleName[0];
            sectorFillColor.editor = "colorpicker";
            sectorFillColor.value = specialEffect.style.fillColor;
            rows.push(sectorFillColor);

            var sectorFillOpacity = new Object();
            sectorFillOpacity.group = sectorStyleGroup[1];
            sectorFillOpacity.name = sectorDetectionStyleName[1];
            sectorFillOpacity.editor = "text";
            sectorFillOpacity.value = specialEffect.style.fillOpacity;
            rows.push(sectorFillOpacity);

            var sectorBoundaryColor = new Object();
            sectorBoundaryColor.group = sectorStyleGroup[1];
            sectorBoundaryColor.name = sectorDetectionStyleName[2];
            sectorBoundaryColor.editor = "colorpicker";
            sectorBoundaryColor.value = specialEffect.style.color;
            rows.push(sectorBoundaryColor);

            var sectorBoundaryOpacity = new Object();
            sectorBoundaryOpacity.group = sectorStyleGroup[1];
            sectorBoundaryOpacity.name = sectorDetectionStyleName[3];
            sectorBoundaryOpacity.editor = "text";
            sectorBoundaryOpacity.value = specialEffect.style.opacity;
            rows.push(sectorBoundaryOpacity);

            var scanFillColor = new Object();
            scanFillColor.group = sectorStyleGroup[2];
            scanFillColor.name = sectorDetectionStyleName[4];
            scanFillColor.editor = "colorpicker";
            scanFillColor.value = specialEffect.scanStyle.fillColor;
            rows.push(scanFillColor);

            var scanFillOpacity = new Object();
            scanFillOpacity.group = sectorStyleGroup[2];
            scanFillOpacity.name = sectorDetectionStyleName[5];
            scanFillOpacity.editor = "text";
            scanFillOpacity.value = specialEffect.scanStyle.fillOpacity;
            rows.push(scanFillOpacity);

            var scanBoundaryColor = new Object();
            scanBoundaryColor.group = sectorStyleGroup[2];
            scanBoundaryColor.name = sectorDetectionStyleName[6];
            scanBoundaryColor.editor = "colorpicker";
            scanBoundaryColor.value = specialEffect.scanStyle.color;
            rows.push(scanBoundaryColor);

            var scanBoundaryOpacity = new Object();
            scanBoundaryOpacity.group = sectorStyleGroup[2];
            scanBoundaryOpacity.name = sectorDetectionStyleName[7];
            scanBoundaryOpacity.editor = "text";
            scanBoundaryOpacity.value = specialEffect.scanStyle.opacity;
            rows.push(scanBoundaryOpacity);
            break;
        case SuperMap.Plot.SpecialEffectType.DESTROY:
            var durationTime = new Object();
            durationTime.group = destroyGroup[0];
            durationTime.name = destroyPropsName[0];
            durationTime.editor = "text";
            durationTime.value = specialEffect.durationTime;
            rows.push(durationTime);
            break;
        case SuperMap.Plot.SpecialEffectType.SCANRADAR:
            var scanLoop = new Object();
            scanLoop.group = radarStyleGroup[0];
            scanLoop.name = radarPropsName[0];
            scanLoop.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            scanLoop.value = checkboxValueToString(specialEffect.loop);
            rows.push(scanLoop);

            var startAngle = new Object();
            startAngle.group = radarStyleGroup[0];
            startAngle.name = radarPropsName[1];
            startAngle.editor = "text";
            startAngle.value = specialEffect.startAngle * 180 / Math.PI;
            rows.push(startAngle);

            var scanPeriod = new Object();
            scanPeriod.group = radarStyleGroup[0];
            scanPeriod.name = radarPropsName[2];
            scanPeriod.editor = "text";
            scanPeriod.value = specialEffect.period;
            rows.push(scanPeriod);

            var radarRadius = new Object();
            radarRadius.group = radarStyleGroup[0];
            radarRadius.name = radarPropsName[3];
            radarRadius.editor = "text";
            radarRadius.value = specialEffect.radiusSelfDefine;
            rows.push(radarRadius);

            var radarVisible = new Object();
            radarVisible.group = radarStyleGroup[0];
            radarVisible.name = radarPropsName[4];
            radarVisible.editor = { "type": 'checkbox', "options": { "on": true, "off": false } };
            radarVisible.value = checkboxValueToString(specialEffect.visible);
            rows.push(radarVisible);

            var centerFillColor = new Object();
            centerFillColor.group = radarStyleGroup[1];
            centerFillColor.name = radarStyleName[0];
            centerFillColor.editor = "colorpicker";
            centerFillColor.value = specialEffect.style.centerStyle.fillColor;
            rows.push(centerFillColor);

            var centerFillOpacity = new Object();
            centerFillOpacity.group = radarStyleGroup[1];
            centerFillOpacity.name = radarStyleName[1];
            centerFillOpacity.editor = "text";
            centerFillOpacity.value = specialEffect.style.centerStyle.fillOpacity;
            rows.push(centerFillOpacity);

            var centerboundaryColor = new Object();
            centerboundaryColor.group = radarStyleGroup[1];
            centerboundaryColor.name = radarStyleName[2];
            centerboundaryColor.editor = "colorpicker";
            centerboundaryColor.value = specialEffect.style.centerStyle.color;
            rows.push(centerboundaryColor);

            var centerboundaryOpacity = new Object();
            centerboundaryOpacity.group = radarStyleGroup[1];
            centerboundaryOpacity.name = radarStyleName[3];
            centerboundaryOpacity.editor = "text";
            centerboundaryOpacity.value = specialEffect.style.centerStyle.opacity;
            rows.push(centerboundaryOpacity);

            var circleFillColor = new Object();
            circleFillColor.group = radarStyleGroup[2];
            circleFillColor.name = radarStyleName[4];
            circleFillColor.editor = "colorpicker";
            circleFillColor.value = specialEffect.style.circleStyle.fillColor;
            rows.push(circleFillColor);

            var circleFillOpacity = new Object();
            circleFillOpacity.group = radarStyleGroup[2];
            circleFillOpacity.name = radarStyleName[5];
            circleFillOpacity.editor = "text";
            circleFillOpacity.value = specialEffect.style.circleStyle.fillOpacity;
            rows.push(circleFillOpacity);

            var circleBoundaryColor = new Object();
            circleBoundaryColor.group = radarStyleGroup[2];
            circleBoundaryColor.name = radarStyleName[6];
            circleBoundaryColor.editor = "colorpicker";
            circleBoundaryColor.value = specialEffect.style.circleStyle.color;
            rows.push(circleBoundaryColor);

            var circleBoundaryOpacity = new Object();
            circleBoundaryOpacity.group = radarStyleGroup[2];
            circleBoundaryOpacity.name = radarStyleName[7];
            circleBoundaryOpacity.editor = "text";
            circleBoundaryOpacity.value = specialEffect.style.circleStyle.opacity;
            rows.push(circleBoundaryOpacity);

            var scanSectorFillColor = new Object();
            scanSectorFillColor.group = radarStyleGroup[3];
            scanSectorFillColor.name = radarStyleName[8];
            scanSectorFillColor.editor = "colorpicker";
            scanSectorFillColor.value = specialEffect.style.scanStyle.fillColor;
            rows.push(scanSectorFillColor);

            var scanSectorFillOpacity = new Object();
            scanSectorFillOpacity.group = radarStyleGroup[3];
            scanSectorFillOpacity.name = radarStyleName[9];
            scanSectorFillOpacity.editor = "text";
            scanSectorFillOpacity.value = specialEffect.style.scanStyle.fillOpacity;
            rows.push(scanSectorFillOpacity);

            break;
        case SuperMap.Plot.SpecialEffectType.MONITORINGRADAR:
            var monitoringRadius = new Object();
            monitoringRadius.group = monitoringRadarStyleGroup[0];
            monitoringRadius.name = monitoringRadarStyleName[4];
            monitoringRadius.editor = "text";
            monitoringRadius.value = specialEffect._radius;
            rows.push(monitoringRadius);

            var monitoringInnerColor = new Object();
            monitoringInnerColor.group = monitoringRadarStyleGroup[1];
            monitoringInnerColor.name = monitoringRadarStyleName[0];
            monitoringInnerColor.editor = "colorpicker";
            monitoringInnerColor.value = specialEffect.getRadarStyle().innerColor;
            rows.push(monitoringInnerColor);

            var monitoringInnerOpacity= new Object();
            monitoringInnerOpacity.group = monitoringRadarStyleGroup[1];
            monitoringInnerOpacity.name = monitoringRadarStyleName[1];
            monitoringInnerOpacity.editor = "text";
            monitoringInnerOpacity.value = specialEffect.getRadarStyle().innerOpacity;
            rows.push(monitoringInnerOpacity);

            var monitoringOuterColor = new Object();
            monitoringOuterColor.group = monitoringRadarStyleGroup[1];
            monitoringOuterColor.name = monitoringRadarStyleName[2];
            monitoringOuterColor.editor ="colorpicker";
            monitoringOuterColor.value = specialEffect.getRadarStyle().outerColor;
            rows.push(monitoringOuterColor);

            var monitoringOuterOpacity = new Object();
            monitoringOuterOpacity.group = monitoringRadarStyleGroup[1];
            monitoringOuterOpacity.name = monitoringRadarStyleName[3];
            monitoringOuterOpacity.editor = "text";
            monitoringOuterOpacity.value = specialEffect.getRadarStyle().outerOpacity;
            rows.push(monitoringOuterOpacity);

            var monitoringOuterRatio = new Object();
            monitoringOuterRatio.group = monitoringRadarStyleGroup[1];
            monitoringOuterRatio.name = monitoringRadarStyleName[5];
            monitoringOuterRatio.editor = "text";
            monitoringOuterRatio.value = specialEffect.getRadarStyle().ratioRadius;
            rows.push(monitoringOuterRatio);

            //目标跟踪线线形：线型
            var monitoringRadarLineStyle = new Object();
            monitoringRadarLineStyle.group = monitoringRadarStyleGroup[2];
            monitoringRadarLineStyle.name = monitoringRadarTargetLine[0];
            if (monitoringRadarLineStyle.lineSymbolID !== undefined) {
                monitoringRadarLineStyle.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getTargetLineTypeRows() } };
                monitoringRadarLineStyle.value = targetLineTypeToString(specialEffect.lineSymbolID);
            } else {
                monitoringRadarLineStyle.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getTargetLineTypeRows() } };
                monitoringRadarLineStyle.value = specialEffect.strokeDashstyle;
            }

            var monitoringRadarLineFlowType = new Object();
            monitoringRadarLineFlowType.group = monitoringRadarStyleGroup[2];
            monitoringRadarLineFlowType.name = monitoringRadarTargetLine[1];
            if (monitoringRadarLineFlowType.lineSymbolID !== undefined) {
                monitoringRadarLineFlowType.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getTargetLineFlowTypeRows() } };
                monitoringRadarLineFlowType.value = targetLineFlowTypeToString(specialEffect.lineSymbolID);
            } else {
                monitoringRadarLineFlowType.editor = { "type": 'combobox', "options": { "valueField": 'value', "textField": 'text', "data": getTargetLineFlowTypeRows() } };
                monitoringRadarLineFlowType.value = specialEffect.strokeDashstyle;
            }
            // var monitoringTargetLine = new Object();
            // monitoringInnerColor.group = monitoringRadarStyleGroup[1];
            // monitoringInnerColor.name = monitoringRadarStyleName[0];
            // monitoringInnerColor.editor = "text";
            // monitoringInnerColor.value = specialEffect.style.monitoringStyle.fillOpacity;
            // rows.push(monitoringInnerColor);

            // var monitoringInnerOpacity= new Object();
            // monitoringInnerOpacity.group = monitoringRadarStyleGroup[1];
            // monitoringInnerOpacity.name = monitoringRadarStyleName[1];
            // monitoringInnerOpacity.editor = "text";
            // monitoringInnerOpacity.value = specialEffect.style.monitoringStyle.fillOpacity;
            // rows.push(monitoringInnerOpacity);

            // var monitoringOuterColor = new Object();
            // monitoringOuterColor.group = monitoringRadarStyleGroup[1];
            // monitoringOuterColor.name = monitoringRadarStyleName[2];
            // monitoringOuterColor.editor = "text";
            // monitoringOuterColor.value = specialEffect.style.monitoringStyle.fillOpacity;
            // rows.push(monitoringOuterColor);

            // var monitoringOuterOpacity = new Object();
            // monitoringOuterOpacity.group = monitoringRadarStyleGroup[1];
            // monitoringOuterOpacity.name = monitoringRadarStyleName[3];
            // monitoringOuterOpacity.editor = "text";
            // monitoringOuterOpacity.value = specialEffect.style.monitoringStyle.fillOpacity;
            // rows.push(monitoringOuterOpacity);

            // var monitoringOuterRatio = new Object();
            // monitoringOuterRatio.group = monitoringRadarStyleGroup[1];
            // monitoringOuterRatio.name = monitoringRadarStyleName[5];
            // monitoringOuterRatio.editor = "text";
            // monitoringOuterRatio.value = specialEffect.style.monitoringStyle.fillOpacity;
            // rows.push(monitoringOuterRatio);
            break;
        default:
            break;
    }
    return rows;
}

/**
 * 跟踪线型
 */
 function targetLineTypeToString(lineType) {
    if (lineType == 0){
        return resources.text_monitoringRadarLineCone;
    }else{
        return resources.text_monitoringRadarLineLine;
    }
        
}

function getTargetLineTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.text_monitoringRadarLineCone });//锥形
    rows.push({ "value": "1", "text": resources.text_monitoringRadarLineLine });//管形
    return rows;
}

/**
 * 跟踪线流动类型
 */
 function targetLineFlowTypeToString(lineFlowType) {
    if (lineFlowType == 0){
        return resources.option_monitoringFlow1;
    }else if(lineFlowType == 1){
        return resources.option_monitoringFlow2;
    }else if(lineFlowType == 2){
        return resources.option_monitoringFlow3;
    }else if(lineFlowType == 3){
        return resources.option_monitoringFlow4;
    }
}

function getTargetLineFlowTypeRows() {
    var rows = [];
    rows.push({ "value": "0", "text": resources.option_monitoringFlow1 });
    rows.push({ "value": "1", "text": resources.option_monitoringFlow2 });
    rows.push({ "value": "2", "text": resources.option_monitoringFlow3 });
    rows.push({ "value": "3", "text": resources.option_monitoringFlow4 });
    return rows;
}

function checkboxValueToString(checkboxValue) {
    if (checkboxValue === true) {
        return "true";
    } else if (checkboxValue === false) {
        return "false";
    }
}
function fromCheckboxValue(checkboxStr) {
    if (checkboxStr === "true") {
        return true;
    } else if (checkboxStr === "false") {
        return false;
    }
}
function getLatLng(ptString){
    var ptArr = ptString.split(",");
    var lat = ptArr[0].substr(1);
    var lng = ptArr[1].substr(0, ptArr[1].length-1);
    var latlng = new L.latLng(parseFloat(lat), parseFloat(lng))
    return latlng
}