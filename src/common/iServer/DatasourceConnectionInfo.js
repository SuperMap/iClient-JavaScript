import SuperMap from '../SuperMap';
import {EngineType} from '../REST';
/**
 * @class SuperMap.DatasourceConnectionInfo
 * @classdesc
 * 数据源连接信息类。
 * 该类包括了进行数据源连接的所有信息，如所要连接的服务器名称、数据库名称、用户名以及密码等。
 * 当保存为工作空间时， 工作空间中的数据源的连接信息都将存储到工作空间文件中。对于不同类型的
 * 数据源，其连接信息有所区别。所以在使 用该类所包含的成员时，请注意该成员所适用的数据源类型。
 * 对于从数据源对象中返回的数据连接信息对象，只有 connect 方法可以被修改，其 他内容是不可以被修改的。
 * 对于用户创建的数据源连接信息对象，其内容都可以修改。
 * @param options - {Object} 参数。
 * Allowed options properties:</br>
 * alias - {String} 数据源别名。</br>
 * connect - {Boolean} 数据源是否自动连接数据。</br>
 * dataBase - {String} 数据源连接的数据库名。</br>
 * driver - {String} 使用 ODBC(Open Database Connectivity，开放数据库互连)的数据库的驱动程序名。</br>
 * engineType - {EngineType} 数据源连接的引擎类型。</br>
 * exclusive - {Boolean} 是否以独占方式打开数据源。</br>
 * OpenLinkTable - {Boolean} 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable 打开。</br>
 * password - {String} 登录数据源连接的数据库或文件的密码。</br>
 * readOnly - {Boolean} 是否以只读方式打开数据源。</br>
 * server - {String} 数据库服务器名或 SDB 文件名。</br>
 * user - {String} 登录数据库的用户名。</br>
 */
export default  class DatasourceConnectionInfo {
    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.alias -{String}
     * @description 数据源别名。
     */
    alias = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.connect -{Boolean}
     * @description 数据源是否自动连接数据。
     */
    connect = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.dataBase -{String}
     * @description 数据源连接的数据库名。
     */
    dataBase = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.driver -{String}
     * @description 使用 ODBC(Open Database Connectivity，开放数据库互连)的数据库的驱动程序名。
     * 其中，对于SQL Server 数据库与 iServer 发布的 WMTS 服务，此为必设参数。
     * 对于SQL Server 数据库，它使用 ODBC 连接，所设置的驱动程序名为 "SQL Server" 或 "SQL Native Client"；
     * 对于 iServer 发布的 WMTS 服务，设置的驱动名称为 "WMTS"。
     */
    driver = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.engineType -{EngineType}
     * @description 数据源连接的引擎类型。
     */
    engineType = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.exclusive-{Boolean}
     * @description 是否以独占方式打开数据源。
     */
    exclusive = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.OpenLinkTable -{Boolean}
     * @description 是否把数据库中的其他非 SuperMap 数据表作为 LinkTable打开。
     */
    OpenLinkTable = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.password -{String}
     * @description 登录数据源连接的数据库或文件的密码。
     */
    password = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.readOnly -{Boolean}
     * @description 是否以只读方式打开数据源。
     */
    readOnly = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.server -{String}
     * @description 数据库服务器名、文件名或服务地址。
     * 1.对于SDB和UDB文件，为其文件的绝对路径。注意：当绝对路径的长度超过UTF-8编码格式的260字节长度，该数据源无法打开。
     * 2.对于Oracle数据库，其服务器名为其TNS服务名称。
     * 3.对于SQL Server数据库，其服务器名为其系统的DSN(Database Source Name)名称。
     * 4.对于PostgreSQL数据库，其服务器名为“IP:端口号”，默认的端口号是 5432。
     * 5.对于DB2数据库，已经进行了编目，所以不需要进行服务器的设置。
     * 6.对于 Kingbase 数据库，其服务器名为其 IP 地址。
     * 7.对于GoogleMaps数据源，其服务器地址，默认设置为“http://maps.google.com”，且不可更改。
     * 8.对于SuperMapCould数据源，为其服务地址。
     * 9.对于MAPWORLD数据源，为其服务地址，默认设置为“http://www.tianditu.cn”，且不可更改。
     * 10.对于OGC和REST数据源，为其服务地址。
     */
    server = null;

    /**
     * @member SuperMap.DatasourceConnectionInfo.prototype.user -{String}
     * @description 登录数据库的用户名。
     */
    user = null;


    constructor(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * @method SuperMap.DatasourceConnectionInfo.prototype.destroy
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

    CLASS_NAME = "SuperMap.DatasourceConnectionInfo"
}
SuperMap.DatasourceConnectionInfo = DatasourceConnectionInfo;