import { defineUserConfig ,defaultTheme} from 'vuepress'
export default defineUserConfig({
  lang: 'zh-CN',
  title: '兮梦',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],
//   base:'notebook',
  description: 'Notebook',
  theme: defaultTheme({
    logo: '/logo.png',
    navbar:[
        {
            text: '主页',
            link: '/'
        },
        {
            text: '大数据',
            children:[
                {
                    text:'Hive on Hadoop',
                    link: '/大数据/Hive on Hadoop.html',
                },
                {
                    text:'大数据（LoongArch64）',
                    link: '/大数据/大数据（LoongArch64）.html',
                },
                {
                    text:'数据分析',
                    link: '/大数据/数据分析.html',
                },
            ]
        },
        {
            text: '前端',
            children:[
                {
                    text: 'js',
                    link: '/前端/js.html',
                }
            ]
        },
        {
            text: '大数据2',
            children:[
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
            text: 'Hadoop',
            children:[
                {
                text: 'Hadoop(伪分布)',
                link: '/Hadoop/Hadoop（伪分布）.html',
                }
                
            ]
        }

        
    ]
  }),
})