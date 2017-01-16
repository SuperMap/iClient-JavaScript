module("InterpolationAnalystService");
var serviceFailedEventArgsSystem = null;
var analystEventArgsSystem = null;
var InterpolationAnalystServiceTest = {};
InterpolationAnalystServiceTest.inputPointsObjArr =[
    {"x":1210581.3465131, "y":5846399.01175416, "z":23},
    {"x":1374568.19688557, "y":5806144.68366852, "z":18},
    {"x":1521370.85300054, "y":5770737.83129165, "z":19},
    {"x":1095631.45977217, "y":5528199.92958311, "z":27},
    {"x":1198626.21785984, "y":5570741.49064607, "z":14},
    {"x":1373169.38077361, "y":5593290.50255359, "z":19},
    {"x":1612502.82819101, "y":5627352.64228498, "z":-5},
    {"x":1081393.24523065, "y":5411257.38832255, "z":25},
    {"x":1369469.88462763, "y":5458415.29448267, "z":18},
    {"x":1479703.15553903, "y":5476577.89402985, "z":14},
    {"x":1625450.59309043, "y":5538359.53266899, "z":6},
    {"x":874680.756098034, "y":5322253.55595858, "z":9},
    {"x":1247212.60467642, "y":5387691.35135605, "z":26},
    {"x":1552293.42507508, "y":5365829.12376669, "z":3},
    {"x":1129966.26952038, "y":5189236.97383116, "z":5},
    {"x":1421971.51732685, "y":5263941.13976024, "z":18},
    {"x":1646535.17129977, "y":5316511.81462062, "z":8},
    {"x":1781263.73730004, "y":5380482.7734873, "z":14},
    {"x":2020110.74786557, "y":5387628.37304574, "z":-4},
    {"x":1404994.6955034, "y":5149389.37335088, "z":-3},
    {"x":1548389.26860757, "y":5175828.87663573, "z":15},
    {"x":1907367.43149643, "y":5309279.1724014, "z":-5},
    {"x":2062286.6638636, "y":5293521.85741038, "z":2},
    {"x":927814.758846577, "y":4976125.83982239, "z":3},
    {"x":1543409.98087479, "y":5026632.56869923, "z":-5},
    {"x":1672545.4937333, "y":5130288.82705181, "z":16},
    {"x":1815170.61581664, "y":5188386.30774339, "z":6},
    {"x":1776810.62037654, "y":5093043.21216217, "z":21},
    {"x":2000720.93926822, "y":5157034.50256423, "z":9},
    {"x":2137211.95629998, "y":5251089.30125404, "z":27},
    {"x":-1384684.21976224, "y":5332054.20434767, "z":16},
    {"x":-1266592.67195803, "y":5275056.3083835, "z":18},
    {"x":-1173120.37547033, "y":5175286.30171108, "z":4},
    {"x":-1666090.72204382, "y":5241172.93384647, "z":13},
    {"x":-1462060.04834705, "y":5203815.90203324, "z":11},
    {"x":-1553103.06288549, "y":5089465.30512548, "z":18},
    {"x":-1122827.89723113, "y":4985329.13408486, "z":21},
    {"x":-1860653.07373091, "y":5084477.14390444, "z":10},
    {"x":-1725720.73925144, "y":5012320.00449773, "z":-1},
    {"x":-1220678.02426651, "y":4847254.4566494, "z":12},
    {"x":-1863459.09401226, "y":4967869.57917987, "z":26},
    {"x":-1376674.68719707, "y":4846715.02903969, "z":16},
    {"x":-1503256.39597018, "y":4749993.79908471, "z":12},
    {"x":-1062382.73304631, "y":4733437.65622082, "z":7},
    {"x":-1666642.31853787, "y":4817393.24951001, "z":19},
    {"x":-1268721.06517955, "y":4731665.18199693, "z":22},
    {"x":-1784339.07456816, "y":4691431.37946197, "z":10},
    {"x":-1537407.40647844, "y":4643802.53247814, "z":-2},
    {"x":-2419318.16518532, "y":4595707.88157582, "z":25},
    {"x":-2175064.94799138, "y":4697780.17446741, "z":23},
    {"x":-2199394.38191528, "y":4571808.9805013, "z":-1},
    {"x":-1978125.62843053, "y":4596066.82343988, "z":20},
    {"x":-1432929.65674657, "y":4496517.04647146, "z":2},
    {"x":-1425142.47552866, "y":4311774.01178654, "z":21},
    {"x":-2347377.8808384, "y":4452868.31749155, "z":14},
    {"x":-2287997.73283675, "y":4340268.27463545, "z":22},
    {"x":-2163460.02757897, "y":4250483.4258309, "z":10},
    {"x":-1828785.52128088, "y":4263739.81754219, "z":10},
    {"x":-1212229.28247201, "y":4188669.31509868, "z":26},
    {"x":-2025606.92718856, "y":4183182.83873892, "z":26},
    {"x":-825209.394421958, "y":4710813.79158798, "z":7},
    {"x":-925452.706876878, "y":4670956.24413595, "z":2},
    {"x":-321480.003370163, "y":4526184.57635418, "z":11},
    {"x":-651959.49175178, "y":4529087.78970059, "z":18},
    {"x":-217002.751793607, "y":4456951.66969839, "z":26},
    {"x":-862966.032372303, "y":4361674.17388149, "z":15},
    {"x":-665822.612619922, "y":4356696.39135096, "z":-1},
    {"x":-16755.8954939763, "y":4318695.18826926, "z":8},
    {"x":-548534.027519153, "y":4291518.68150134, "z":19},
    {"x":-281463.84777592, "y":4214198.76083203, "z":15},
    {"x":-993942.17692933, "y":4217114.78997084, "z":25},
    {"x":-388864.100827363, "y":4188310.29690308, "z":25},
    {"x":-163911.282778357, "y":4147044.70045506, "z":10},
    {"x":-989326.169926525, "y":3994669.65229173, "z":12},
    {"x":-831169.132434991, "y":4097277.46806724, "z":-2},
    {"x":-663189.775811282, "y":4027790.2582361, "z":26},
    {"x":-423251.717948863, "y":4008890.15249491, "z":10},
    {"x":-185918.900601112, "y":3985439.0098199, "z":23},
    {"x":-887752.642321781, "y":3940087.84301485, "z":12},
    {"x":-607958.642974107, "y":3902840.70822795, "z":0},
    {"x":-284995.314627413, "y":3933468.62385761, "z":0},
    {"x":-98784.4216291984, "y":3854005.31553064, "z":2},
    {"x":-1062959.98443942, "y":3823156.34762407, "z":24},
    {"x":-378120.522440156, "y":3808807.65507124, "z":13},
    {"x":0, "y":3778115.4734166, "z":22},
    {"x":555675.893973636, "y":4730534.72017257, "z":23},
    {"x":719410.765951757, "y":4852624.17143594, "z":11},
    {"x":416086.892674244, "y":4596256.33005592, "z":10},
    {"x":788837.859700444, "y":4791746.94877328, "z":26},
    {"x":115404.754046287, "y":4453008.15232032, "z":17},
    {"x":641143.983066076, "y":4596011.98746132, "z":3},
    {"x":288969.735496225, "y":4481738.3587981, "z":5},
    {"x":445513.596625804, "y":4503841.15536681, "z":11},
    {"x":735284.890774623, "y":4547533.1139069, "z":0},
    {"x":554568.91407516, "y":4410713.69270361, "z":-1},
    {"x":667140.230636665, "y":4443600.75131925, "z":19},
    {"x":697974.317012174, "y":4340461.47812997, "z":-1},
    {"x":63161.0494544051, "y":4275630.55404934, "z":22},
    {"x":200844.704710507, "y":4386963.12826204, "z":9},
    {"x":253524.487125277, "y":4202007.50817714, "z":-2},
    {"x":419214.550976308, "y":4291562.13846185, "z":18},
    {"x":520391.418470442, "y":4246332.74161325, "z":-3},
    {"x":724422.341977581, "y":4212339.56506825, "z":7},
    {"x":803872.440458256, "y":4319799.30743599, "z":5},
    {"x":104259.642156941, "y":4129148.23944623, "z":25},
    {"x":403953.288135979, "y":4109815.76603993, "z":1},
    {"x":658420.237399424, "y":4182364.9195765, "z":4},
    {"x":810569.047871445, "y":4116114.81460488, "z":18},
    {"x":57888.6128501599, "y":4015665.70312797, "z":17},
    {"x":207560.532887203, "y":4051893.79873069, "z":15},
    {"x":276969.255214574, "y":3955829.39507851, "z":6},
    {"x":529235.890586695, "y":4033619.21146623, "z":14},
    {"x":652385.210996039, "y":4074202.839648, "z":26},
    {"x":696258.054838688, "y":3996377.3703958, "z":21},
    {"x":828160.952774673, "y":4008021.5303752, "z":21},
    {"x":395141.805401175, "y":3924572.25012626, "z":-1},
    {"x":604975.099446582, "y":3987617.53255572, "z":5},
    {"x":574491.97093995, "y":3874146.39928132, "z":25},
    {"x":826688.565478772, "y":3900010.46986606, "z":23},
    {"x":148384.115113218, "y":3798192.21543255, "z":-3},
    {"x":233881.007408209, "y":3820764.88362328, "z":-1},
    {"x":364131.993837199, "y":3751682.66734236, "z":16},
    {"x":538899.222473607, "y":3754910.35564437, "z":9},
    {"x":658807.463567117, "y":3813977.85449175, "z":-3},
    {"x":792225.28442553, "y":3806050.10370921, "z":7},
    {"x":989879.451014638, "y":4878613.66968738, "z":14},
    {"x":1247443.67571332, "y":4913952.11370657, "z":8},
    {"x":1140083.25107815, "y":4831270.94477481, "z":4},
    {"x":1492086.6167465, "y":4921315.05493549, "z":7},
    {"x":1918509.27530086, "y":5052757.70771331, "z":7},
    {"x":2042017.29979237, "y":5063796.81301938, "z":21},
    {"x":877851.099733359, "y":4793681.90422199, "z":16},
    {"x":1040808.50860678, "y":4774006.99534911, "z":9},
    {"x":1372389.78541081, "y":4825058.94082724, "z":8},
    {"x":1543742.52786379, "y":4809389.80096441, "z":10},
    {"x":1597042.34358779, "y":4902262.258834, "z":-3},
    {"x":1842559.94348831, "y":4895476.54413311, "z":23},
    {"x":932329.791285148, "y":4599996.60493905, "z":14},
    {"x":1130375.65588701, "y":4634929.70981753, "z":16},
    {"x":1271390.10186989, "y":4663722.19893533, "z":15},
    {"x":1416741.02877937, "y":4697792.92263294, "z":13},
    {"x":1613992.86446047, "y":4699147.54747854, "z":20},
    {"x":1738675.30026215, "y":4827335.18909809, "z":20},
    {"x":1954423.57165034, "y":4866923.04130859, "z":6},
    {"x":958554.984492026, "y":4493384.04876875, "z":5},
    {"x":1039735.87537795, "y":4584793.26261634, "z":16},
    {"x":1264987.12544988, "y":4573368.71974201, "z":7},
    {"x":1326693.92599423, "y":4535682.89893446, "z":18},
    {"x":1504197.34322534, "y":4635574.88352796, "z":7},
    {"x":1780949.13158124, "y":4700294.42098123, "z":-5},
    {"x":1736296.85726129, "y":4609648.65600361, "z":8},
    {"x":1892050.86697712, "y":4681629.34942827, "z":2},
    {"x":819736.784093866, "y":4429115.4946153, "z":26},
    {"x":875265.46321163, "y":4391346.67602316, "z":6},
    {"x":1069883.28758263, "y":4480718.86504277, "z":26},
    {"x":1161193.55835407, "y":4426733.6720174, "z":-4},
    {"x":1429545.72668076, "y":4499741.2075763, "z":16},
    {"x":1634202.9161613, "y":4544119.35480714, "z":4},
    {"x":1612068.91063451, "y":4462966.02017487, "z":25},
    {"x":963309.010178802, "y":4332966.0782395, "z":5},
    {"x":1032901.83534834, "y":4261654.54843649, "z":20},
    {"x":1105939.22516913, "y":4335564.77584577, "z":27},
    {"x":1170895.84077513, "y":4317860.35764764, "z":6},
    {"x":895159.921777312, "y":4217404.24906042, "z":5},
    {"x":1013674.17742552, "y":4172037.28506849, "z":21},
    {"x":1410882.22311226, "y":4294064.32320943, "z":17},
    {"x":981182.910627941, "y":4065800.48286813, "z":0},
    {"x":1083753.04706252, "y":4085762.36636633, "z":12},
    {"x":1318132.26920098, "y":4132090.75205249, "z":5},
    {"x":1529070.00567553, "y":4142586.73480868, "z":18},
    {"x":934688.365342644, "y":3901432.30854768, "z":3},
    {"x":1055867.46884087, "y":3979771.31620484, "z":19},
    {"x":1065036.66719561, "y":3941036.30757412, "z":4},
    {"x":1157932.98860132, "y":3945317.28258398, "z":3},
    {"x":1239207.37028499, "y":4021239.52247673, "z":11},
    {"x":1350795.41035969, "y":3959852.55882132, "z":7},
    {"x":1410747.90968575, "y":4049571.66639741, "z":24},
    {"x":930774.762858088, "y":3812004.0719844, "z":-2},
    {"x":1052333.00528697, "y":3861707.05045625, "z":19},
    {"x":1192606.77848034, "y":3820762.94886215, "z":18},
    {"x":1291276.59054776, "y":3878446.39774496, "z":2},
    {"x":-2280711.28933375, "y":3740457.13221034, "z":18},
    {"x":-1898494.89479583, "y":3610835.64657684, "z":25},
    {"x":-1399626.09108375, "y":3432858.02097836, "z":7},
    {"x":-1283933.48926119, "y":3525877.24680728, "z":26},
    {"x":-1207841.10592021, "y":3417074.9256984, "z":14},
    {"x":-2235091.75387382, "y":3472059.71094418, "z":18},
    {"x":-1535719.26165889, "y":3405191.58105513, "z":-3},
    {"x":-1313233.1022214, "y":3317974.06375021, "z":9},
    {"x":-1668231.07906761, "y":3215456.02366254, "z":9},
    {"x":-1543300.50386288, "y":3213100.7340777, "z":9},
    {"x":-1322861.96368399, "y":3226788.4638176, "z":14},
    {"x":-1726275.53533564, "y":3174717.87547459, "z":16},
    {"x":-1213998.10397285, "y":3071026.63935862, "z":5},
    {"x":-1551388.82660322, "y":3042582.07956807, "z":23},
    {"x":-1134893.92611012, "y":3718278.01215987, "z":13},
    {"x":-891441.225776796, "y":3541408.55446127, "z":9},
    {"x":-834256.439798467, "y":3675701.19714148, "z":10},
    {"x":-732998.03015512, "y":3540464.43959992, "z":12},
    {"x":-608366.655726914, "y":3746189.56692848, "z":15},
    {"x":-487052.674114973, "y":3606814.82794058, "z":10},
    {"x":-305817.396472208, "y":3709929.54664069, "z":23},
    {"x":-185572.123301419, "y":3576785.13185038, "z":8},
    {"x":-188273.034228444, "y":3736802.08201411, "z":17},
    {"x":-88798.5526841957, "y":3671256.44640523, "z":19},
    {"x":-7623.30418290906, "y":3554207.61323663, "z":17},
    {"x":-1043182.71934844, "y":3442294.00160218, "z":25},
    {"x":-879746.005973445, "y":3372470.13339255, "z":18},
    {"x":-735820.26243473, "y":3329846.46586159, "z":23},
    {"x":-598714.291633867, "y":3385774.17225212, "z":14},
    {"x":-467319.138920955, "y":3365061.37108834, "z":0},
    {"x":-432661.89096875, "y":3438511.67240308, "z":13},
    {"x":-365797.290833479, "y":3289222.03255561, "z":13},
    {"x":-257770.633540852, "y":3388770.17906844, "z":1},
    {"x":-225771.692979256, "y":3489340.01488981, "z":-2},
    {"x":-132336.985354525, "y":3470604.75468223, "z":-3},
    {"x":-44754.6223657837, "y":3443468.92293677, "z":-3},
    {"x":-29663.1701911858, "y":3336462.95672917, "z":26},
    {"x":-562133.802732499, "y":3188348.36033678, "z":7},
    {"x":-451072.029089209, "y":3182395.10255378, "z":2},
    {"x":-190690.808347991, "y":3171691.27767082, "z":27},
    {"x":-93001.3198132454, "y":3246944.60898054, "z":-3},
    {"x":-1018939.24320695, "y":3189044.90691625, "z":-2},
    {"x":-452936.775008653, "y":3075883.66985843, "z":23},
    {"x":-288960.46159696, "y":3181664.96098998, "z":3},
    {"x":-159790.744577716, "y":3118781.22393754, "z":17},
    {"x":-728952.008541062, "y":3048061.66104169, "z":-3},
    {"x":-593441.216272313, "y":3016310.11607334, "z":27},
    {"x":-337546.791497588, "y":3065512.79171986, "z":7},
    {"x":-38674.8588136952, "y":3037253.5443433, "z":25},
    {"x":-562922.85739458, "y":2870958.91798656, "z":25},
    {"x":-267015.166073815, "y":2940239.589357, "z":8},
    {"x":-126172.573115854, "y":2876002.74884915, "z":13},
    {"x":-472704.963798652, "y":2832711.95458169, "z":-1},
    {"x":-272502.708102723, "y":2800972.85034979, "z":3},
    {"x":-170569.940210372, "y":2772709.84050023, "z":6},
    {"x":-70850.184314894, "y":2821578.0335128, "z":5},
    {"x":-655586.120477028, "y":2637288.51064395, "z":3},
    {"x":-587777.726745159, "y":2644172.18392656, "z":15},
    {"x":-482287.720412992, "y":2703298.89946865, "z":3},
    {"x":-313691.583453497, "y":2700248.29722294, "z":16},
    {"x":-349824.747787611, "y":2621928.10377776, "z":-5},
    {"x":-233803.408535259, "y":2618547.89012006, "z":2},
    {"x":-115340.872386075, "y":2679316.75973283, "z":22},
    {"x":-728995.100717991, "y":2531477.86970731, "z":4},
    {"x":-125143.603172223, "y":2563094.64881326, "z":24},
    {"x":-502247.561521754, "y":2502934.899521, "z":-5},
    {"x":-524954.107223773, "y":2358890.88240176, "z":9},
    {"x":-439585.374990592, "y":2292630.51177167, "z":1},
    {"x":-416990.30480708, "y":2377779.72650678, "z":20},
    {"x":-309745.082737913, "y":2445570.16048078, "z":11},
    {"x":-359916.399294494, "y":2232920.85836036, "z":10},
    {"x":-326398.332104555, "y":2352502.54855071, "z":-3},
    {"x":-166103.912027098, "y":2436706.39270386, "z":5},
    {"x":67600.2272072867, "y":3688008.89570777, "z":16},
    {"x":192838.184529764, "y":3663480.15988555, "z":7},
    {"x":355703.330753522, "y":3662810.59694284, "z":19},
    {"x":458561.395295938, "y":3688204.18776202, "z":12},
    {"x":547133.521977902, "y":3644173.48283529, "z":8},
    {"x":671945.729762831, "y":3718679.28398731, "z":-4},
    {"x":777367.148298923, "y":3736696.43296549, "z":14},
    {"x":186765.444956859, "y":3518527.47714298, "z":26},
    {"x":696201.573074832, "y":3539458.56983606, "z":5},
    {"x":865109.855108802, "y":3638944.59590014, "z":25},
    {"x":282035.410131644, "y":3408250.65462685, "z":17},
    {"x":371995.501741616, "y":3484719.53651323, "z":19},
    {"x":536177.020615121, "y":3415764.87662477, "z":27},
    {"x":617095.718836684, "y":3460331.70655059, "z":8},
    {"x":719233.636417891, "y":3441411.77217682, "z":26},
    {"x":827799.023170084, "y":3546714.9420924, "z":19},
    {"x":839739.868053981, "y":3449748.54867299, "z":20},
    {"x":90421.6594242863, "y":3349980.98134904, "z":21},
    {"x":165247.267444322, "y":3351011.0721427, "z":6},
    {"x":234913.696065381, "y":3309382.62069191, "z":-2},
    {"x":423508.672359737, "y":3299160.4264898, "z":13},
    {"x":710677.759931878, "y":3329772.07689117, "z":26},
    {"x":939912.922450867, "y":3352006.07650959, "z":23},
    {"x":103889.72619136, "y":3260166.78454166, "z":3},
    {"x":264733.745155264, "y":3252089.69762263, "z":14},
    {"x":424247.109423719, "y":3212982.41711427, "z":6},
    {"x":595211.439003019, "y":3269120.01253464, "z":16},
    {"x":681507.113912423, "y":3233715.91139639, "z":16},
    {"x":863121.036452202, "y":3280596.97028057, "z":20},
    {"x":4790.18386941863, "y":3124913.88382641, "z":15},
    {"x":140506.955285668, "y":3125950.54618129, "z":8},
    {"x":495831.120641366, "y":3117269.89290298, "z":9},
    {"x":775380.764486573, "y":3134080.45553659, "z":5},
    {"x":922632.139487556, "y":3107858.7627186, "z":3},
    {"x":41857.0362429994, "y":3046593.54436373, "z":10},
    {"x":207498.128916585, "y":3056211.55619788, "z":23},
    {"x":363960.379351961, "y":3047811.12765708, "z":15},
    {"x":523881.777939532, "y":3014137.90043046, "z":21},
    {"x":643823.784250282, "y":3086839.04362806, "z":23},
    {"x":769827.483357505, "y":3002649.08852154, "z":14},
    {"x":27872.9317484134, "y":2869651.62869318, "z":16},
    {"x":184415.713127814, "y":2915984.37123388, "z":18},
    {"x":317288.190737034, "y":2947341.33027515, "z":18},
    {"x":459764.109022809, "y":2897186.39990223, "z":4},
    {"x":636193.600186931, "y":2882905.72963603, "z":0},
    {"x":756729.755392647, "y":2898971.75316899, "z":13},
    {"x":916448.816089683, "y":2968738.55616601, "z":25},
    {"x":976711.338986039, "y":2890565.81626988, "z":15},
    {"x":171902.057106717, "y":2791279.37379748, "z":10},
    {"x":361998.773794132, "y":2839146.61113946, "z":9},
    {"x":476456.06826857, "y":2754915.98957811, "z":-5},
    {"x":557463.43710115, "y":2822295.133214, "z":17},
    {"x":658343.404961133, "y":2772793.28116736, "z":-1},
    {"x":886760.652637347, "y":2844691.45420129, "z":27},
    {"x":943423.425118805, "y":2807138.33514438, "z":20},
    {"x":18418.8067302062, "y":2662024.11856233, "z":18},
    {"x":177481.053361353, "y":2663586.26199006, "z":12},
    {"x":255020.70915319, "y":2709676.47335934, "z":10},
    {"x":352799.332235946, "y":2727489.45631578, "z":25},
    {"x":532908.75690764, "y":2663296.58097299, "z":-4},
    {"x":802909.606638045, "y":2735201.31001107, "z":7},
    {"x":998128.571597744, "y":2760413.64414772, "z":26},
    {"x":1096537.39352312, "y":3721063.11897967, "z":1},
    {"x":1264114.54213764, "y":3806009.76636672, "z":17},
    {"x":977303.165355995, "y":3659897.89147288, "z":11},
    {"x":1276315.61125214, "y":3667119.12693735, "z":2},
    {"x":1383256.45824885, "y":3702016.02329532, "z":8},
    {"x":993474.608174142, "y":3553877.77738901, "z":19},
    {"x":988812.470727333, "y":3468372.02258786, "z":26},
    {"x":1136200.78538739, "y":3574413.54323796, "z":-2},
    {"x":1280217.3139514, "y":3485554.36380323, "z":-1},
    {"x":1404852.66645533, "y":3602651.62845188, "z":27},
    {"x":1534975.70049492, "y":3532437.89455206, "z":26},
    {"x":1058628.67769239, "y":3389316.83744639, "z":20},
    {"x":1137507.28023503, "y":3451596.58641825, "z":9},
    {"x":1273287.33287609, "y":3388043.07507577, "z":23},
    {"x":1352440.04337153, "y":3431490.1846496, "z":2},
    {"x":1446840.44101627, "y":3404118.13654751, "z":14},
    {"x":1537904.45771578, "y":3430248.27034911, "z":-2},
    {"x":1138696.00897506, "y":3300696.23828829, "z":-4},
    {"x":1247991.0128512, "y":3269372.40205119, "z":9},
    {"x":1368572.04179806, "y":3310808.88154252, "z":-4},
    {"x":1436282.30060329, "y":3307745.87523641, "z":0},
    {"x":1050098.71440737, "y":3183057.72978458, "z":5},
    {"x":1169757.52866603, "y":3165123.62391299, "z":15},
    {"x":1508596.80461907, "y":3247205.08430535, "z":19},
    {"x":1623292.93924163, "y":3220867.3050062, "z":5},
    {"x":1055834.05376887, "y":3072906.12802057, "z":6},
    {"x":1185083.1453954, "y":3054259.10311613, "z":11},
    {"x":1336444.52037402, "y":3153271.28341821, "z":20},
    {"x":1442694.06935961, "y":3106608.29535023, "z":6},
    {"x":1532059.54674761, "y":3162114.31669025, "z":-1},
    {"x":1522546.41646987, "y":3068112.28164598, "z":23},
    {"x":1139742.59881217, "y":2968163.18255175, "z":21},
    {"x":1222724.73515578, "y":2950198.46071246, "z":1},
    {"x":1249618.60194525, "y":3023025.03384796, "z":18},
    {"x":1317873.81676608, "y":3028386.49699655, "z":11},
    {"x":1488901.19639095, "y":2987528.20626134, "z":-4},
    {"x":1118210.83117724, "y":2883359.91153971, "z":20},
    {"x":1301055.07382683, "y":2883598.58787324, "z":25},
    {"x":1419701.42834733, "y":2836475.40569418, "z":-1},
    {"x":1543326.83079009, "y":2958458.5860529, "z":1},
    {"x":1134190.44287698, "y":2773249.97485878, "z":16},
    {"x":1230215.39264762, "y":2797825.85798144, "z":7},
    {"x":1210454.4310213, "y":2698499.26537307, "z":5},
    {"x":1308155.99447455, "y":2779877.97637571, "z":-5},
    {"x":1478372.53112989, "y":2781523.46641634, "z":18},
    {"x":1695729.51000478, "y":2780955.25640357, "z":7},
    {"x":6799.32802877793, "y":2510740.12762428, "z":12},
    {"x":308869.62466418, "y":2585502.07350235, "z":24},
    {"x":447221.767184735, "y":2551956.45893858, "z":10},
    {"x":561536.925382477, "y":2541072.16723061, "z":25},
    {"x":746443.966797166, "y":2617749.62086522, "z":7},
    {"x":870118.731926645, "y":2616622.64409527, "z":24},
    {"x":871138.446539101, "y":2526117.35551937, "z":14},
    {"x":962572.713231698, "y":2589894.81075705, "z":6},
    {"x":1073650.66836698, "y":2666076.85000705, "z":21},
    {"x":1127265.84789501, "y":2595916.05090011, "z":23},
    {"x":1322781.05891515, "y":2643960.95299855, "z":-3},
    {"x":1625448.05035969, "y":2690579.35813788, "z":20},
    {"x":85592.5201350268, "y":2439386.41098449, "z":25},
    {"x":163473.376908244, "y":2493652.93430166, "z":-3},
    {"x":521986.400406256, "y":2450556.72116492, "z":3},
    {"x":646186.918019999, "y":2466884.14656935, "z":1},
    {"x":767653.131214962, "y":2425626.31896125, "z":19},
    {"x":857239.359467968, "y":2447486.46961931, "z":27},
    {"x":989620.395439375, "y":2522243.18899328, "z":-2},
    {"x":1197469.02378431, "y":2507730.91636747, "z":0},
    {"x":1575725.75755317, "y":2515065.5362656, "z":14},
    {"x":1724911.11615994, "y":2711088.22388368, "z":19},
    {"x":192226.955334629, "y":2321657.01922523, "z":6},
    {"x":333125.849076423, "y":2358215.7463019, "z":1},
    {"x":616071.11968716, "y":2340110.43037654, "z":21},
    {"x":942101.979933059, "y":2386868.04824598, "z":0},
    {"x":1069925.25071151, "y":2427051.46053508, "z":24},
    {"x":1691516.60435959, "y":2552373.86167019, "z":3},
    {"x":377265.300760663, "y":2284684.51680657, "z":7},
    {"x":433410.421562829, "y":2232072.61508466, "z":20},
    {"x":567501.528117173, "y":2212966.14726872, "z":-5},
    {"x":726918.621760921, "y":2294192.7665261, "z":14},
    {"x":811372.65703444, "y":2285821.69523238, "z":-5},
    {"x":569203.736194104, "y":2083802.1431006, "z":25},
    {"x":388581.639089637, "y":1974178.47564884, "z":21},
    {"x":490290.131491742, "y":2023621.24785655, "z":14},
    {"x":586386.72889879, "y":1997704.05015512, "z":4},
    {"x":489483.436576429, "y":1884474.06621417, "z":8}
];
InterpolationAnalystServiceTest.pointWithZs = [];
for(var item in InterpolationAnalystServiceTest.inputPointsObjArr){
    var jsonArr = InterpolationAnalystServiceTest.inputPointsObjArr;
    var pointwithz =new SuperMap.Geometry.Point(jsonArr[item].x, jsonArr[item].y, jsonArr[item].z);
    InterpolationAnalystServiceTest.pointWithZs.push(pointwithz);
}

InterpolationAnalystServiceTest.geoIDWAnalystParameters =  new SuperMap.REST.InterpolationIDWAnalystParameters({
    "outputDatasetName":"IDWCreatepoints",
    "pixelFormat":SuperMap.REST.PixelFormat.BIT16,
    "resolution":3000,
    "searchRadius":0,
    "inputPoints":InterpolationAnalystServiceTest.pointWithZs,
    "power":2,
    "searchMode":"KDTREE_FIXED_RADIUS",
    "expectedCount":12,
    "zValueScale":1,
    InterpolationAnalystType: "geometry"
});

function initInterpolationAnalystService() {
    var interService = new SuperMap.REST.InterpolationAnalystService(GlobeParameter.spatialAnalystURL, {eventListeners:{"processCompleted": analyzeCompleted,'processFailed': analyzeFailed}});
    return interService;
}

function analyzeFailed(serviceFailedEventArgs) {
    serviceFailedEventArgsSystem = serviceFailedEventArgs;
}

function analyzeCompleted(analyseEventArgs) {
    analystEventArgsSystem = analyseEventArgs;
}

//不直接返回查询结果
asyncTest("TestInterpolationAnalystServiceByDensity", function () {
    var interServiceByDensity = initInterpolationAnalystService();
    ok(interServiceByDensity != null, "not null");
    equal(interServiceByDensity.url, GlobeParameter.spatialAnalystURL, "url");
    var clip = new SuperMap.REST.ClipParameter();
    clip.isClipInRegion = true;
    clip.clipDatasourceName = "Interpolation";
    var sides = 50;
    var origin = new SuperMap.Geometry.Point(5,0);
    //clip.clipRegion = new SuperMap.Geometry.Polygon.createRegularPolygon(origin,6,sides,270);
    clip.clipDatasetName= "BoundsR";
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationDensityAnalystParameters({
        dataset: "SamplesP@Interpolation",
        searchRadius: "100000",
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        clipParam:clip,
        outputDatasourceName: "Interpolation",
        outputDatasetName: "myDensity"
    });

    interServiceByDensity.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByDensity.lastResult;
            ok(overlayResult != null, "interServiceByDensity.lastResult");

            interServiceByDensity.destroy();
            start();
        } catch (exception) {
            //ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 15000)
});

asyncTest("TestOverlayAnalyzeByDensity_failed", function () {
    var interServiceByDensity = initInterpolationAnalystService();
    ok(interServiceByDensity != null, "not null");
    equal(interServiceByDensity.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationDensityAnalystParameters({
        dataset: "SamplesPP@China400",
        searchRadius: "100000",
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myDensity"
    });

    interServiceByDensity.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByDensity.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"数据集SamplesPP@China400不存在","serviceFailedEventArgsSystem.error.errorMsg");
            ok(overlayResult == null, "overlayResult.lastResult");

            interServiceByDensity.destroy();

            start();
        } catch (exception) {
            //ok(false, "exception occcurs,message is:" + exception.message)
            start();
        }
    }, 15000)
});

asyncTest("TestInterpolationAnalystServiceByIDW", function () {
    var interServiceByIDW = initInterpolationAnalystService();
    ok(interServiceByIDW != null, "not null");
    equal(interServiceByIDW.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationIDWAnalystParameters({
        dataset:"SamplesP@Interpolation",
        power: 2,
        searchMode: SuperMap.REST.SearchMode.KDTREE_FIXED_COUNT,
        expectedCount: 12,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myIDW"
    });

    interServiceByIDW.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByIDW.lastResult;
            ok(overlayResult != null, "interServiceByIDW.lastResult");

            interServiceByIDW.destroy();
            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestInterpolationAnalystServiceByGeometryIDW", function () {
    var interServiceByIDW = initInterpolationAnalystService();
    ok(interServiceByIDW != null, "not null");
    equal(interServiceByIDW.url, GlobeParameter.spatialAnalystURL, "url");
    interServiceByIDW.processAsync(InterpolationAnalystServiceTest.geoIDWAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByIDW.lastResult;
            ok(overlayResult != null, "interServiceByIDW.lastResult");
            interServiceByIDW.destroy();
            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestOverlayAnalyzeByIDW_failed", function () {
    var interServiceByIDW = initInterpolationAnalystService();
    ok(interServiceByIDW != null, "not null");
    equal(interServiceByIDW.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationIDWAnalystParameters({
        dataset:"SamplesPP@China400",
        power: 2,
        searchMode: SuperMap.REST.SearchMode.KDTREE_FIXED_COUNT,
        expectedCount: 12,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myIDW"
    });

    interServiceByIDW.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByIDW.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"数据集SamplesPP@China400不存在","serviceFailedEventArgsSystem.error.errorMsg");
            ok(overlayResult == null, "overlayResult.lastResult");

            interServiceByIDW.destroy();

            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestInterpolationAnalystServiceByRBF", function () {
    var interServiceByRBF = initInterpolationAnalystService();
    ok(interServiceByRBF != null, "not null");
    equal(interServiceByRBF.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationRBFAnalystParameters({
        dataset:"SamplesP@Interpolation",
        smooth: 0.1,
        tension: 40,
        searchMode: SuperMap.REST.SearchMode.QUADTREE,
        maxPointCountForInterpolation: 20,
        maxPointCountInNode: 5,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myRBF"
    });

    interServiceByRBF.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByRBF.lastResult;
            ok(overlayResult != null, "interServiceByRBF.lastResult");

            interServiceByRBF.destroy();
            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestOverlayAnalyzeByRBF_failed", function () {
    var interServiceByRBF = initInterpolationAnalystService();
    ok(interServiceByRBF != null, "not null");
    equal(interServiceByRBF.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationRBFAnalystParameters({
        dataset:"SamplesPP@China400",
        smooth: 0.1,
        tension: 40,
        searchMode: SuperMap.REST.SearchMode.QUADTREE,
        maxPointCountForInterpolation: 20,
        maxPointCountInNode: 5,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myRBF"
    });

    interServiceByRBF.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByRBF.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"数据集SamplesPP@China400不存在","serviceFailedEventArgsSystem.error.errorMsg");
            ok(overlayResult == null, "overlayResult.lastResult");

            interServiceByRBF.destroy();

            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestInterpolationAnalystServiceByKriging", function () {
    var interServiceByKriging = initInterpolationAnalystService();
    ok(interServiceByKriging != null, "not null");
    equal(interServiceByKriging.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationKrigingAnalystParameters({
        dataset:"SamplesP@Interpolation",
        type: SuperMap.REST.InterpolationAlgorithmType.KRIGING,
        angle: 0,
        mean: 5,
        nugget: 30,
        range: 50,
        sill: 300,
        variogramMode: SuperMap.REST.VariogramMode.EXPONENTIAL,
        searchMode: SuperMap.REST.SearchMode.QUADTREE,
        maxPointCountForInterpolation: 20,
        maxPointCountInNode: 5,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myKriging"
    });

    interServiceByKriging.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByKriging.lastResult;
            ok(overlayResult != null, "interServiceByKriging.lastResult");

            interServiceByKriging.destroy();
            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});

asyncTest("TestOverlayAnalyzeByKriging_failed", function () {
    var interServiceByKriging = initInterpolationAnalystService();
    ok(interServiceByKriging != null, "not null");
    equal(interServiceByKriging.url, GlobeParameter.spatialAnalystURL, "url");
    var dsOverlayAnalystParameters = new SuperMap.REST.InterpolationKrigingAnalystParameters({
        dataset:"SamplesPP@China400",
        type: SuperMap.REST.InterpolationAlgorithmType.KRIGING,
        angle: 0,
        mean: 5,
        nugget: 30,
        range: 50,
        sill: 300,
        variogramMode: SuperMap.REST.VariogramMode.EXPONENTIAL,
        searchMode: SuperMap.REST.SearchMode.QUADTREE,
        maxPointCountForInterpolation: 20,
        maxPointCountInNode: 5,
        pixelFormat: SuperMap.REST.PixelFormat.BIT16,
        zValueFieldName: "AVG_TMP",
        resolution: 3000,
        filterQueryParameter: {
            attributeFilter: ""
        },
        outputDatasetName: "myKriging"
    });

    interServiceByKriging.processAsync(dsOverlayAnalystParameters);

    setTimeout(function () {
        try {
            var overlayResult = interServiceByKriging.lastResult;
            equal(serviceFailedEventArgsSystem.error.errorMsg,"数据集SamplesPP@China400不存在","serviceFailedEventArgsSystem.error.errorMsg");
            ok(overlayResult == null, "overlayResult.lastResult");

            interServiceByKriging.destroy();

            start();
        } catch (exception) {
            start();
        }
    }, 15000)
});