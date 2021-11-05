/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {EngineType} from '../REST'; // eslint-disable-line no-unused-vars

/**
 * @class SuperMap.DatasourceConnectionInfo
 * @category  iServer Data
 * @classdesc 数据源连接信息类。该类包括了进行数据源连接的所有信息，如所要连接的服务器名称、数据库名称、用户名以及密码等。
 *            当保存为工作空间时， 工作空间中的数据源的连接信息都将存储到工作空间文件中。对于不同类型的数据源，其连接信息有所区别。
 *            所以在使 用该类所包含的成员时，请注意该成员所适用的数据源类型。对于从数据源对象中返回的数据连接信息对象，只有 connect 方法可以被修改，
 *            其他内容是不可以被修改的。对于用户创建的数据源连接信息对象，其内容都可以修改。
 * @category iServer Data
 * @param {Object} options - 参数。 
 * @param {string} options.alias - 数据源别名。 
 * @param {string} options.dataBase - 数据源连接的数据库名。 
 * @param {boolean} [options.connect] - 数据源是否自动连接数据。 
 * @param {string} [options.driver] - 使用 ODBC(Open Database Connectivity，开放数据库互连)的数据库的驱动程序名。 
 * @param {SuperMap.EngineType} [options.engineType] - 数据源连接的引擎类型。 
 * @param {boolean} [options.exclusive] - 是否以独占方式打开数据源。 
 * @param {boolean} [options.OpenLinkTable] - 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。 
 * @param {string} [options.password] - 登录数据源连接的数据库或文件的密码。 
 * @param {boolean} [options.readOnly] - 是否以只读方式打开数据源。 
 * @param {string} [options.server] - 数据库服务器名或 SDB 文件名。 
 * @param {string} [options.user] - 登录数据库的用户名。 
 */
export class DatasourceConnectionInfo {


    constructor(options) {

        /**
         * @member {string} SuperMap.DatasourceConnectionInfo.prototype.alias
         * @description 数据源别名。
         */
        this.alias = null;

        /**
         * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.connect]
         * @description 数据源是否自动连接数据。
         */
        this.connect = null;

        /**
         * @member {string} SuperMap.DatasourceConnectionInfo.prototype.dataBase
         * @description 数据源连接的数据库名。
         */
        this.dataBase = null;

        /**
         * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.driver]
         * @description 使用 ODBC(Open Database Connectivity，开放数据库互连) 的数据库的驱动程序名。
         * 其中，对于 SQL Server 数据库与 iServer 发布的 WMTS 服务，此为必设参数。
         * 对于 SQL Server 数据库，它使用 ODBC 连接，所设置的驱动程序名为 "SQL Server" 或 "SQL Native Client"；
         * 对于 iServer 发布的 WMTS 服务，设置的驱动名称为 "WMTS"。
         */
        this.driver = null;

        /**
         * @member {SuperMap.EngineType} [SuperMap.DatasourceConnectionInfo.prototype.engineType]
         * @description 数据源连接的引擎类型。
         */
        this.engineType = null;

        /**
         * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.exclusive]
         * @description 是否以独占方式打开数据源。
         */
        this.exclusive = null;

        /**
         * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.OpenLinkTable]
         * @description 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。
         */
        this.OpenLinkTable = null;

        /**
         * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.password]
         * @description 登录数据源连接的数据库或文件的密码。
         */
        this.password = null;

        /**
         * @member {boolean} [SuperMap.DatasourceConnectionInfo.prototype.readOnly]
         * @description 是否以只读方式打开数据源。
         */
        this.readOnly = null;

        /**
         * @member {string} [SuperMap.DatasourceConnectionInfo.prototype.server]
         * @description 数据库服务器名、文件名或服务地址。
         * 1.对于 SDB 和 UDB 文件，为其文件的绝对路径。注意：当绝对路径的长度超过 UTF-8 编码格式的 260 字节长度，该数据源无法打开。
         * 2.对于 Oracle 数据库，其服务器名为其 TNS 服务名称。
         * 3.对于 SQL Server 数据库，其服务器名为其系统的 DSN(Database Source Name) 名称。
         * 4.对于 PostgreSQL 数据库，其服务器名为 “IP:端口号”，默认的端口号是 5432。
         * 5.对于 DB2 数据库，已经进行了编目，所以不需要进行服务器的设置。
         * 6.对于 Kingbase 数据库，其服务器名为其 IP 地址。
         * 7.对于 GoogleMaps 数据源，其服务器地址，默认设置为 “{@link http://maps.google.com}”，且不可更改。
         * 8.对于 SuperMapCould 数据源，为其服务地址。
         * 9.对于 MAPWORLD 数据源，为其服务地址，默认设置为 “{@link http://www.tianditu.cn}”，且不可更改。
         * 10.对于 OGC 和 REST 数据源，为其服务地址。
         */
        this.server = null;

        /**
         * @member {string} SuperMap.DatasourceConnectionInfo.prototype.user
         * @description 登录数据库的用户名。
         */
        this.user = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DatasourceConnectionInfo";
    }

    /**
     * @function SuperMap.DatasourceConnectionInfo.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.alias = null;
        me.connect = null;
        me.dataBase = null;
        me.driver = null;
        me.engineType = null;
        me.exclusive = null;
        me.OpenLinkTable = null;
        me.password = null;
        me.readOnly = null;
        me.server = null;
        me.user = null;
    }

}
