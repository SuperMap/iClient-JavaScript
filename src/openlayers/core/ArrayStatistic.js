export class ArrayStatistic {

    // geostatsInstance: null,

    /**
     * 初始化插件实例
     */
    static newInstance() {
        // if(!this.geostatsInstance) {
        //         //     this.geostatsInstance = new geostats();
        //         // }
        if(!this.geostatsInstance) {

            this.geostatsInstance = new window.geostats();
        }
        return this.geostatsInstance;
    }

    /**
     * 设置需要被处理的数组
     * 
     * @param array 
     */
    static getInstance(array) {
        let instance = this.newInstance();
        instance.setSerie(array);
        return instance;
    }

    /**
     * 获取数组统计的值
     *    
     * @param array 需要统计的数组
     * @param type  统计方法
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
     * 获取数组分段后的数值
     * 
     * @param array  需要分段的数组
     * @param type   分段方法
     * @param segNum 分段个数
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
     * 求和
     * @param array
     * @returns {number}
     */
    static getSum(array){
        return this.getInstance(array).sum();
    }

    /**
     * 最小值
     * @param array
     * @returns {*}
     */
    static getMax(array){
        return this.getInstance(array).max();
    }

    /**
     * 最大值
     * @param array
     * @returns {*}
     */
    static getMin(array){
        return this.getInstance(array).min();
    }

    /**
     * 求平均
     * @param array
     * @returns {number}
     */
    static getMean(array){
        return this.getInstance(array).mean();
    }

    /**
     * 求中位数
     * 
     * @param array
     * @returns {number} 
     */
    static getMedian(array) {
        return this.getInstance(array).median();
    }

    /**
     * 计数
     * 
     * @param array
     * @returns {number} 
     */
    static getTimes(array) {
        return array.length;
    }

    /**
     * 等距分段法
     * 
     * @param array 
     * @param segNum
     */
    static getEqInterval(array, segNum) {
        return this.getInstance(array).getClassEqInterval(segNum);
    }
    
    /**
     * 自然断裂法
     * 
     * @param array 
     * @param segNum
     */
    static getJenks(array, segNum) {
        return this.getInstance(array).getClassJenks(segNum);
    }

    /**
     * 平方根分段法
     * 
     * @param array
     * @param segNum
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
     * 对数分段法
     * 
     * @param array 
     * @param segNum
     */
    static getGeometricProgression(array, segNum) {
        return this.getInstance(array).getClassGeometricProgression(segNum);
    }

}