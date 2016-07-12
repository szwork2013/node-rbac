// Learn more on how to config.
// - https://github.com/dora-js/dora-plugin-proxy#规则定义

module.exports = {
  //代理API到本地
  '/api/*': 'http://localhost:9000',

  // Mock 数据返回
  'POST /api/auth/login': function(req,res){
    res.json({isError:false,data:{token:'ffff'},message:'ffff'})
  },
  // 通过自定义函数替换请求
  //'/custom-func/:action': function (req, res) {
    // req 和 res 的设计类 express，http://expressjs.com/en/api.html
    //
    // req 能取到：
    //   1. params
    //   2. query
    //   3. body
    //
    // res 有以下方法：
    //   1. set(object|key, value)
    //   2. type(json|html|text|png|...)
    //   3. status(200|404|304)
    //   4. json(jsonData)
    //   5. jsonp(jsonData[, callbackQueryName])
    //   6. end(string|object)
    //
  //}
};
