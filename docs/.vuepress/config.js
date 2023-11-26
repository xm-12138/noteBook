import { defineUserConfig ,defaultTheme} from 'vuepress'
export default defineUserConfig({
  lang: 'zh-CN',
  title: '御坂网络',
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
        }
      {
            text: '大数据2',
            children:[
                {
                    text: '大数据',
                    link: '/大数据2/大数据.html',
                }
            ]
        }
    ]
  }),
})
