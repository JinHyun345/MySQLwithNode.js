var template = require('./template.js');
var db = require('./db');
var qs = require('querystring');
var url = require('url');


exports.home = function(request, response){
    db.query(`SELECT * FROM topic`, function (error, topics) {
        db.query(`SELECT * FROM author`, function (error, authors) {
        var title = 'Welcome';
        var list = template.list(topics);
        var html = template.HTML(title, list,
            `
            ${template.authorTable(authors)}

            <form action="/author/create_process" method="post">
                <p><input type="text" name="name" placeholder="name"></p>
                <p>
                    <textarea name="profile" placeholder="profile"></textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            <style>
                table{
                border-collapse: collapse;
                }
                td{
                border : 1px, solid black;
                margin : 0px;
                }
            </style>
            `,
            ``
        );
        response.writeHead(200);
        response.end(html);
        });
    });
}
exports.create = function(request, response){
    var body = '';
    request.on('data', function (data) {
      body = body + data;
    });
    request.on('end', function () {
      var post = qs.parse(body);
        db.query(`INSERT INTO author (name, profile) VALUES( ?, ?)`, [post.name, post.profile], function (error, results) {
          if (error) {
            throw error;
          }
          response.writeHead(302, { Location: `/author`});
          response.end();
        });
      });
}
exports.update = function(request, response){
  var _url = request.url;
  var queryData = url.parse(_url, true).query;
  db.query(`SELECT * FROM topic`, function (error, topics) {
    db.query(`SELECT * FROM author`, function (error2, authors) {
      db.query(`SELECT * FROM author WHERE id=?`,[queryData.id], function (error3, author) {
        var title = 'Welcome';
        var list = template.list(topics);
        var html = template.HTML(title, list,
            `
            ${template.authorTable(authors)}

            <form action="/author/update_process" method="post">
                <input type="hidden" name="id" value="${author[0].id}">
                <p><input type="text" name="name" placeholder="name" value=${author[0].name}></p>
                <p>
                    <textarea name="profile" placeholder="profile">${author[0].profile}</textarea>
                </p>
                <p>
                    <input type="submit">
                </p>
            </form>
            <style>
                table{
                border-collapse: collapse;
                }
                td{
                border : 1px, solid black;
                margin : 0px;
                }
            </style>
            `,
            ``
        );
        response.writeHead(200);
        response.end(html);
    });
  });
});
}
exports.update_process = function(request, response){
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query(`UPDATE author SET name=?, profile=? WHERE id=?`, [post.name, post.profile, post.id], function (error, results) {
      if (error) {
        throw error;
      }
      response.writeHead(302, { Location: `/author` });
      response.end();
    });
  });
}
exports.delete = function(request, response){
  var body = '';
  request.on('data', function (data) {
    body = body + data;
  });
  request.on('end', function () {
    var post = qs.parse(body);
    db.query(`DELETE FROM topic WHERE author_id=?`, [post.id], function (error1, result1) {
      if (error1) {
        throw error1;
      }
      db.query(`DELETE FROM author WHERE id=?`, [post.id], function (error2, result2) {
        if (error2) {
          throw error2;
        }
        response.writeHead(302, { Location: `/author` });
        response.end();
      });
    });
  });
}