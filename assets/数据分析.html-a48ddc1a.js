import{_ as s,o as a,c as e,a as t}from"./app-139acd2e.js";const p={};function i(c,n){return a(),e("div",null,n[0]||(n[0]=[t(`<h1 id="数据分析" tabindex="-1"><a class="header-anchor" href="#数据分析" aria-hidden="true">#</a> 数据分析</h1><h2 id="加载数据" tabindex="-1"><a class="header-anchor" href="#加载数据" aria-hidden="true">#</a> 加载数据</h2><p>创建数据库</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">create</span> <span class="token keyword">database</span> <span class="token identifier"><span class="token punctuation">\`</span>e<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">use</span> <span class="token identifier"><span class="token punctuation">\`</span>e<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><p>创建表</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 创建表(行为)</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> user_act<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> user_act
<span class="token punctuation">(</span>
    <span class="token identifier"><span class="token punctuation">\`</span>act_date<span class="token punctuation">\`</span></span> string <span class="token keyword">comment</span> <span class="token string">&#39;行为发生的日期（年/月/日）&#39;</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>act_time<span class="token punctuation">\`</span></span> string <span class="token keyword">comment</span> <span class="token string">&#39;行为发生的时间（时:分:秒）&#39;</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span>     string <span class="token keyword">comment</span> <span class="token string">&#39;序列化的用户唯一标识（数据已脱敏）&#39;</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>act_type<span class="token punctuation">\`</span></span> string <span class="token keyword">comment</span> <span class="token string">&#39;行为类型：
1.浏览；2.下单；3.关注；4.评论；
5.加入购物车；6.咨询客服；7.投诉；&#39;</span><span class="token punctuation">,</span>
    <span class="token identifier"><span class="token punctuation">\`</span>sku<span class="token punctuation">\`</span></span>      <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">&#39;序列化的商品唯一标识（数据已脱敏）&#39;</span>
<span class="token punctuation">)</span>
    <span class="token keyword">row</span> format delimited
        <span class="token keyword">fields</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">&#39;,&#39;</span>
        <span class="token keyword">lines</span> <span class="token keyword">terminated</span> <span class="token keyword">by</span> <span class="token string">&#39;\\n&#39;</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建表(商品)</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> sku<span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> sku
<span class="token punctuation">(</span>
    id    <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">&quot;序列化的商品唯一标识（数据已脱敏）&quot;</span><span class="token punctuation">,</span>
    price <span class="token keyword">float</span> <span class="token keyword">comment</span> <span class="token string">&quot;商品价格，单位为元。&quot;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token comment">-- 创建表(用户)</span>
<span class="token keyword">drop</span> <span class="token keyword">table</span> <span class="token keyword">if</span> <span class="token keyword">exists</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
<span class="token keyword">create</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span>
<span class="token punctuation">(</span>
    id <span class="token keyword">int</span> <span class="token keyword">comment</span> <span class="token string">&#39;序列化的用户唯一标识（数据已脱敏）&#39;</span><span class="token punctuation">,</span>
    address string <span class="token keyword">comment</span> <span class="token string">&#39;用户所在城市，精确到所在的市、县&#39;</span><span class="token punctuation">,</span>
    birthday string <span class="token keyword">comment</span> <span class="token string">&#39;用户生日（年/月/日）&#39;</span><span class="token punctuation">,</span>
    gender string <span class="token keyword">comment</span> <span class="token string">&#39;用户性别：女性为female；男性为male&#39;</span>
<span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>加载数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 加载数据(行为表)</span>
<span class="token keyword">LOAD</span> <span class="token keyword">DATA</span> <span class="token keyword">LOCAL</span> INPATH <span class="token string">&#39;/home/hadoop/data/user_act.csv&#39;</span>
    OVERWRITE <span class="token keyword">INTO</span> <span class="token keyword">TABLE</span> user_act<span class="token punctuation">;</span>

<span class="token comment">-- 加载数据(商品表)</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> INPATH <span class="token string">&#39;/home/hadoop/data/sku.csv&#39;</span>
    overwrite <span class="token keyword">into</span> <span class="token keyword">table</span> sku<span class="token punctuation">;</span>

<span class="token comment">-- 加载数据(用户表)</span>
<span class="token keyword">load</span> <span class="token keyword">data</span> <span class="token keyword">local</span> INPATH <span class="token string">&#39;/home/hadoop/data/user.csv&#39;</span>
    overwrite <span class="token keyword">into</span> <span class="token keyword">table</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>统计基础数量</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token comment">-- 行为数量 37207645</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
<span class="token keyword">from</span> user_act<span class="token punctuation">;</span>

<span class="token comment">-- 商品数量 378458</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
<span class="token keyword">from</span> sku<span class="token punctuation">;</span>

<span class="token comment">-- 用户数量 1608709</span>
<span class="token keyword">select</span> <span class="token function">count</span><span class="token punctuation">(</span><span class="token operator">*</span><span class="token punctuation">)</span>
<span class="token keyword">from</span> <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="数据清洗" tabindex="-1"><a class="header-anchor" href="#数据清洗" aria-hidden="true">#</a> 数据清洗</h2><p>去除完全重复的数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> user_act
<span class="token keyword">select</span> act_date<span class="token punctuation">,</span>
       act_time<span class="token punctuation">,</span>
       <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">,</span>
       act_type<span class="token punctuation">,</span>
       sku
<span class="token keyword">from</span> user_act
<span class="token keyword">group</span> <span class="token keyword">by</span> act_date<span class="token punctuation">,</span>
         act_time<span class="token punctuation">,</span>
         <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">,</span>
         act_type<span class="token punctuation">,</span>
         sku<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去除日期异常的数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> user_act
<span class="token keyword">select</span> act_date<span class="token punctuation">,</span>
       act_time<span class="token punctuation">,</span>
       <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">,</span>
       act_type<span class="token punctuation">,</span>
       sku
<span class="token keyword">from</span> user_act
<span class="token keyword">where</span> act_date <span class="token operator">between</span> <span class="token string">&#39;2018-01-01&#39;</span> <span class="token operator">and</span> <span class="token string">&#39;2018-12-30&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>去除时间异常的数据</p><div class="language-sql line-numbers-mode" data-ext="sql"><pre class="language-sql"><code><span class="token keyword">insert</span> overwrite <span class="token keyword">table</span> user_act
<span class="token keyword">select</span> act_date<span class="token punctuation">,</span>
       act_time<span class="token punctuation">,</span>
       <span class="token identifier"><span class="token punctuation">\`</span>user<span class="token punctuation">\`</span></span><span class="token punctuation">,</span>
       act_type<span class="token punctuation">,</span>
       sku
<span class="token keyword">from</span> user_act
<span class="token keyword">where</span> act_time <span class="token operator">between</span> <span class="token string">&#39;00:00:00&#39;</span> <span class="token operator">and</span> <span class="token string">&#39;23:59:59&#39;</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,17)]))}const o=s(p,[["render",i],["__file","数据分析.html.vue"]]);export{o as default};
