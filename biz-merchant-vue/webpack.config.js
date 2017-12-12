'use strict';
const path = require('path');
var glob = require('glob');

/**
 * 加入单页面多文件入口
 * @param entries
 * @returns {*}
 */
function entries (entries, path) {
    let globPath = 'app/web/page/app/**/*.js';
    var files = glob.sync(globPath);
    for (var i = 0; i < files.length; i++) {
        let entry = files[i];
        let basename = path.basename(entry, '.js');
        let name = basename + "/" +basename;
        let obj = {};
        obj[name] = entry + "?loader=false";
        entries.push(obj);
    }
    return entries;
}

module.exports = {
    egg: true,
    framework: 'vue',
    entry: {
        include: entries([
            'app/web/page'
        ], path),
        exclude: [
            // 'app/web/page/app/*',
            'app/web/page/[a-z]+/component',
            'app/web/page/test',
            'app/web/page/html'
        ],
        loader: {
            client: 'app/web/framework/vue/entry/client-loader.js',
            server: 'app/web/framework/vue/entry/server-loader.js',
        },
        html: {
            include: [
                'app/web/page/html'
            ],
            template: 'app/web/view/layout.html',
            buildDir: 'html',
            options: {}
        }
    },
    alias: {
        server: 'app/web/framework/vue/entry/server.js',
        client: 'app/web/framework/vue/entry/client.js',
        app: 'app/web/framework/vue/app.js',
        asset: 'app/web/asset',
        component: 'app/web/component',
        framework: 'app/web/framework',
        store: 'app/web/store'
    },
    packs: {
        'pack/inline': ['app/web/framework/inject/pack-inline.js']
    },
    loaders: {
        eslint: false,
        css: {
            exclude: [] // 开启node_modules 目录, 解决mint-ui css in module
        },
        less: false, // 没有使用, 禁用可以减少npm install安装时间
        stylus: false // 没有使用, 禁用可以减少npm install安装时间
    },
    plugins: {
        provide: false,
        define: {
            args() { // 支持函数, 这里仅做演示测试,isNode无实际作用
                return {
                    isNode: this.ssr
                };
            }
        },
        commonsChunk: {
            args: {
                minChunks: 5
            }
        },
        uglifyJs: {
            args: {
                compress: {
                    warnings: false
                }
            }
        }
    },
    create(){// 自定义扩展, 可以用 this
        if(this.type ==='client'){      // 对浏览器模式进行扩展
            //设置api请求 服务器端ssr抓取数据时需要 带上cookie
            this.setAlias("~api", "app/web/framework/vue/api/api-client")
        }else if(this.type ==='server'){ // 对服务端配置进行扩展
            this.setAlias("~api", "app/web/framework/vue/api/api-server")
        }
    }
};