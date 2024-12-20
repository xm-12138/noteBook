import { defineUserConfig, defaultTheme } from 'vuepress'

export default defineUserConfig({
    lang: 'zh-CN',
    title: '兮梦',
    head: [
        ['link', { rel: 'icon', href: '/logo.png' }],
        ['script', {}, `
            var busuanziValueSitePv = document.createElement('script');
            busuanziValueSitePv.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
            document.head.appendChild(busuanziValueSitePv);
        `]
    ],
    description: 'Notebook',
    theme: defaultTheme({
        logo: '/logo.png',
        navbar: [
            {
                text: '主页',
                link: '/'
            },
            {
                text: '大数据',
                children: [
                    {
                        text: 'Hive on Hadoop',
                        link: '/大数据/Hive on Hadoop.html',
                    },
                    {
                        text: '大数据（LoongArch64）',
                        link: '/大数据/大数据（LoongArch64）.html',
                    },
                    {
                        text: '数据分析',
                        link: '/大数据/数据分析.html',
                    },
                    {
                        text: '命令小技巧',
                        link: '/大数据2/命令小技巧.html',
                    },
                    {
                        text: '基础配置',
                        link: '/大数据2/基础配置.html',
                    },
                    {
                        text: 'zookeeper',
                        link: '/大数据2/zookeeper.html',
                    },
                    {
                        text: 'Hadoop',
                        link: '/大数据2/Hadoop.html',
                    }
                ]
            },
            {
                text: '前端',
                children: [
                    {
                        text: 'js',
                        link: '/前端/js.html',
                    }
                ]
            },
            {
                text: 'Hadoop',
                children: [
                    {
                        text: 'Linux命令大全',
                        link: 'https://www.runoob.com/linux/linux-command-manual.html',
                    },
                    {
                        text: 'Hadoop(伪分布)',
                        link: '/Hadoop/Hadoop（伪分布）.html',
                    },
                    {
                        text: 'Hadoop(集群)',
                        link: '/Hadoop/Hadoop（集群）.html',
                    },
                    {
                        text: '大作业（美国疫情分析）',
                        link: '/Hadoop/大作业（美国疫情分析）.html',
                    }

                ]
            },
            {
                text: '410wifi棒子的折腾日记',
                children: [
                    {
                        text: '410wifi棒子刷机',
                        link: '/410wifi棒子的折腾日记/410wifi棒子的刷机.html',
                    },
                    {
                        text: 'HomeAssistant',
                        link: '/410wifi棒子的折腾日记/HomeAssistant.html',
                    }

                ]
            },
            {
                text: '数据库',
                children: [
                    {
                        text: '数据库课程设计',
                        link: '/数据库/数据库课程设计.html',
                    },
                    {
                        text: '每个表的字段解释',
                        link: '/数据库/每个表的字段解释.html',
                    },
                    {
                        text: '数据库字段插入',
                        link: '/数据库/数据库字段插入.html',
                    }

                ]
            }
        ]
    }),
})