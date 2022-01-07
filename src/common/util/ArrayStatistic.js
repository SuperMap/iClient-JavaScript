/**
 * @class ArrayStatistic
 * @classdesc 处理数组。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const arrayStatistic = {namespace}.ArrayStatistic();
 *
 * </script>
 * // ES6 Import
 * import { ArrayStatistic } from '{npm}';
 * new ArrayStatistic();
 * ```
 */
export class ArrayStatistic {

    // geostatsInstance: null,

    /**
     * @function ArrayStatistic.newInstance
     * @description 初始化插件实例。
     */
    static newInstance() {
        // if(!this.geostatsInstance) {
        //         //     this.geostatsInstance = new geostats();
        //         // }
        // window.dataList = [];
        if(!this.geostatsInstance) {

            this.geostatsInstance = new window.geostats();
          
        }
        return this.geostatsInstance;
    }

    /**
     * @function ArrayStatistic.getInstance
     * @description 设置需要被处理的数组。
     * @param {array} array - 数组。
     */
    static getInstance(array) {
        let instance = this.newInstance();
        instance.setSerie(array);
        return instance;
    }

    /**
     * @function ArrayStatistic.getArrayStatistic
     * @description 获取数组统计的值。
     * @param {array} array - 需要统计的数组。
     * @param {string} type - 统计方法。
     */
    static getArrayStatistic(array, type){
        if(!array.length) {
            return 0;
        }
        if(type === "Sum" || type === "求和"){
            return this.getSum(array);
        } else if(type === "Maximum" || type === "最大值"){
            return this.getMax(array);
        } else if(type === "Minimum" || type === "最小值"){
            return this.getMin(array);
        } else if(type === "Average" || type === "平均值"){
            return this.getMean(array);
        } else if(type === "Median" || type === "中位数"){
            return this.getMedian(array);
        } else if(type === "times" || type === "计数"){
            return this.getTimes(array);
        }
    }

    /**
     * @function ArrayStatistic.getArraySegments
     * @description 获取数组分段后的数值。
     * @param {array} array - 需要分段的数组。
     * @param {string} type - 分段方法。
     * @param {number} segNum - 分段个数。
     */
    static getArraySegments(array, type, segNum) {
        if(type === "offset") {
            return this.getEqInterval(array, segNum);
        } else if(type === "jenks") {
            return this.getJenks(array, segNum);
        } else if(type === "square") {
            // 数据都必须 >= 0
            let minValue = this.getMin(array);
            if(minValue >= 0){
                return this.getSqrtInterval(array, segNum);
            }else {
                //console.log('数据都必须 >= 0');
                // Util.showMessage(Language.hasNegValue + Language.noSupportRange, 'ERROR');
                return false;
            }

        } else if(type === "logarithm") {
            // 数据都必须 > 0
            let minValue = this.getMin(array);
            if(minValue > 0){
                return this.getGeometricProgression(array, segNum);
            }else {
                //console.log('数据都必须 > 0');
                // Util.showMessage(Language.hasZeroNegValue + Language.noSupportRange, 'ERROR');
                return false;
            }
        }
    }

    /**
     * @function ArrayStatistic.getSum
     * @description 求和。
     * @param {array} array 需要求和的参数。
     * @returns {number} 返回求和结果。
     */
    static getSum(array){
        return this.getInstance(array).sum();
    }

    /**
     * @function ArrayStatistic.getMax
     * @description 最大值。
     * @param {array} array 需要求最大值的参数。
     * @returns {number} 返回最大值。
     */
    static getMax(array){
        return this.getInstance(array).max();
    }

    /**
     * @function ArrayStatistic.getMin
     * @description 最小值。
     * @param {array} array 需要求最小值的参数。
     * @returns {number} 返回最小值。
     */
    static getMin(array){
        return this.getInstance(array).min();
    }

    /**
     * @function ArrayStatistic.getMean
     * @description 求平均数。
     * @param {array} array 需要求平均数的参数。
     * @returns {number} 返回平均数。
     */
    static getMean(array){
        return this.getInstance(array).mean();
    }

    /**
     * @function ArrayStatistic.getMedian
     * @description 求中位数。
     * @param {array} array 需要求中位数的参数。
     * @returns {number} 返回中位数。
     */
    static getMedian(array) {
        return this.getInstance(array).median();
    }

    /**
     * @function ArrayStatistic.getTimes
     * @description 计数。
     * @param {array} array 需要计数的参数。
     * @returns {number} 返回计数结果。
     */
    static getTimes(array) {
        return array.length;
    }

    /**
     * @function ArrayStatistic.getEqInterval
     * @description 等距分段法。
     * @param {array} array 需要进行等距分段的数组。
     * @param {number} segNum 分段个数。
     */
    static getEqInterval(array, segNum) {
        return this.getInstance(array).getClassEqInterval(segNum);
    }
    
    /**
     * @function ArrayStatistic.getJenks
     * @description 自然断裂法。
     * @param {array} array 需要进行自然断裂的参数。
     * @param {number} segNum 分段个数。
     */
    static getJenks(array, segNum) {
        return this.getInstance(array).getClassJenks(segNum);
    }

    /**
     * @function ArrayStatistic.getSqrtInterval
     * @description 平方根分段法。
     * @param {array} array 需要进行平方根分段的参数。
     * @param {number} segNum 分段个数。
     */
    static getSqrtInterval(array, segNum) {
        array = array.map(function(value) {
            return Math.sqrt(value);
        });
        let breaks = this.getInstance(array).getClassEqInterval(segNum);
        return (
            breaks.map(function(value) {
                return value * value;
            })
        ) 
    }

    /**
     * @function ArrayStatistic.getGeometricProgression
     * @description 对数分段法。
     * @param {array} array 需要进行对数分段的参数。
     * @param {number} segNum 分段个数。
     */
    static getGeometricProgression(array, segNum) {
        return this.getInstance(array).getClassGeometricProgression(segNum);
    }

}