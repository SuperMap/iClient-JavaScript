/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import maplibregl from 'maplibre-gl';
import { L7Layer } from './index';

export * from './index';

maplibregl.supermap = {};
maplibregl.supermap.L7Layer = L7Layer;
