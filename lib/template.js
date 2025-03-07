module.exports = {
  HTML:function(title, list, body, control){
    return `
    <!doctype html>
    <html>
    <head>
      <title>WEB1 - ${title}</title>
      <meta charset="utf-8">
    </head>
    <body>
      <h1><a href="/">WEB</a></h1>
      <a href="/author">author</a>
      ${list}
      ${control}
      ${body}
    </body>
    </html>
    `;
  },list:function(topics){
    var list = '<ul>';
    var i = 0;
    while(i < topics.length){
      list = list + `<li><a href="/?id=${topics[i].id}">${topics[i].title}</a></li>`;
      i = i + 1;
    }
    list = list+'</ul>';
    return list;
  }, authorSelect:function(authors, author_id){
    var tag ='';
    var i = 0;
    while(i<authors.length){
      var selected ='';
      if(authors[i].id === author_id){
        selected = ' selected';
      }
      tag += `<option value="${authors[i].id}"${selected}>${authors[i].name}</option>`;
      i +=1;
    }
    return `<select name="author" placeholder="author">
              ${tag}
            </select>`
  }, authorTable:function(authors){
    var i = 0;
    var table ='<table>';
    while(i<authors.length){
        table += '<tr>'+`<td>${authors[i].name}</td>`;
        table += `<td>${authors[i].profile}</td>`;
        table += `<td><a href="/author/update?id=${authors[i].id}">update</a></td>`;
        table += `<td>
            <form action="author/delete" method="post">
                <input type="hidden" name="id" value="${authors[i].id}">
                <input type="submit" value="delete">
            </form></td>` + '</tr>';
            i +=1;
    }
    table += '<table>';
    return table;
  }
}
