
/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../../SuperMap';
/**
 * Namespace: SuperMap.Lang["en"]
 * Dictionary for English.  Keys for entries are used in calls to
 *     <SuperMap.Lang.translate>.  Entry bodies are normal strings or
 *     strings formatted for use with <SuperMap.String.format> calls.
 */
let en = {
    'title_dataFlowService': 'Data Flow Service',
    'title_distributedAnalysis': 'Distributed Analysis',
    'title_clientComputing': 'Client Computing',

    'text_input_value_inputDataFlowUrl': 'Please enter the data stream service address such as: ws://{serviceRoot}/{dataFlowName}/dataflow/subscribe',
    'text_displayFeaturesInfo': 'Display feature information',
    'text_subscribe': 'subscribe',
    'text_cancelSubscribe': 'unsubscribe',

    'text_densityAnalysis': 'Density Analysis',
    'text_CalculateTheValuePerUnitArea': 'Calculate the value per unit area within the neighborhood shape',
    'text_option_selectDataset':'Please select a dataset',
    'text_label_dataset': 'Dataset',
    'text_option_simplePointDensityAnalysis': 'Simple point density analysis',
    'text_option_nuclearDensityAnalysis': 'Nuclear density analysis',
    'text_label_analyticalMethod': 'Analytical method',
    'text_option_quadrilateral': 'Quadrilateral',
    'text_option_hexagon': 'hexagon',
    'text_label_meshType': 'Mesh type',
    'text_option_notSet': 'Not set',
    'text_label_weightField': 'Weight field',
    'text_label_gridSizeInMeters': 'Grid size (in meters)',
    'text_label_searchRadius': 'Search radius',
    'text_option_equidistantSegmentation': 'Equidistant segmentation',
    'text_option_logarithm': 'Logarithm',
    'text_option_equalCountingSegment': 'Equal counting segment',
    'text_option_squareRootSegmentation': 'Square root segmentation',
    'text_label_thematicMapSegmentationMode': 'Thematic map segmentation mode',
    'text_label_thematicMapSegmentationParameters': 'Thematic map segmentation parameters',
    'text_option_greenOrangePurpleGradient': 'Green orange purple gradient',
    'text_option_greenOrangeRedGradient': 'Green orange red gradient',
    'text_option_rainbowGradient': 'Rainbow gradient',
    'text_option_spectralGradient': 'Spectral gradient',
    'text_option_terrainGradient': 'Terrain gradient',
    'text_label_thematicMapColorGradientMode': 'Thematic map color gradient mode',
    'text_label_resultLayerName': 'Result layer name',
    'text_chooseFile': 'Open File',
    'text_isoline': 'Isoline',
    'text_extractDiscreteValue': 'Extract discrete value generation curve',
    'text_buffer': 'Buffer',
    'text_specifyTheDistance': 'Specify the distance to create the surrounding area',
    'text_label_analysisLayer': 'Analysis layer',
    'text_label_extractField': 'Extract field',
    'text_label_extractedValue': 'Extracted value',
    'text_label_distanceAttenuation': 'Distance attenuation',
    'text_label_gridSize': 'gridSize',
    'text_label_bufferRadius': 'Buffer radius',
    'text_label_defaultkilometers': 'Default 10 kilometers',
    'text_label_kilometer': 'kilometer',
    'text_label_unit': 'unit',
    'text_retainOriginal': 'Retain original object field',
    'text_mergeBuffer': 'Merge buffer',
    'text_label_color': 'Color',
    'text_label_buffer': '[Buffer]',
    'text_label_isolines': '[Isolines]',
    
    "btn_analyze": "Analyze",
    "btn_analyzing": "Analyzing",
    "btn_emptyTheAnalysisLayer": "Empty the analysis layer",
    "btn_cancelAnalysis": "Cancel",

    'msg_dataFlowServiceHasBeenSubscribed': 'The data stream service has been subscribed to.',
    'msg_inputDataFlowUrlFirst': 'Please enter the data stream service address first.',
    'msg_datasetOrMethodUnsupport': 'This dataset does not support this analysis type. Please reselect the dataset.',
    'msg_selectDataset': 'Please select a data set!',
    'msg_setTheWeightField': 'Please set the weight field!',
    'msg_theFieldNotSupportAnalysis': 'The field you currently select does not support analysis!',
    'msg_resultIsEmpty': 'The result of the analysis is empty!'


};
export { en };
SuperMap.Lang['en-US'] = en;
