
jQuery(function($){
    
    var navigation = {
        next : function(id, type){
            if (typeof type == 'undefined') type = true;
            if ($('div div', id).length > 3){
                var nodes = $('div div.active', id);
                if (nodes.length){
                    for (var i = 0; i < nodes.length; i++)
                        nodes[i].className = 'item';
                    if (type){
                        var node = $(nodes[ nodes.length-1 ]);
                        var limit = 3;
                        if (!node.next().length){
                            node = $('div div:first', id).addClass('active');
                            limit = 2;
                        }
                        for (var i = 0; i < limit; i++){
                            if (node.next()){
                                node = node.next();
                                node.addClass('active');
                            }
                        }
                    }
                    else{
                        var node = $(nodes[0]);
                        var limit = 3;
                        if (!node.prev().length){
                            var list = $('div div', id);
                            node = $(list[ list.length-1 ]);
                            node.addClass('active');
                            if (list.length % 3) limit = list.length % 3 - 1;
                            else limit--;
                        }
                        for (var i = 0; i < limit; i++){
                            if (node.prev()){
                                node = node.prev();
                                node.addClass('active');
                            }
                        } 
                    }
                }
            }
            return false;
        },
        prev : function(id){ return navigation.next(id, false); }
    };
    $('.scroll-content ul.navigation .prev').click(function(){ return navigation.prev(this.parentNode.parentNode); });
    $('.scroll-content ul.navigation .next').click(function(){ return navigation.next(this.parentNode.parentNode); });
    
    var path = location.pathname.replace(/(\.html|\.htm|\/)$/, '');
    var prefix = 'http://' + location.hostname + (path ? path : '/index');
    $('a[rel~=nofollow],a[rel~=external]').each(function(){
        this.href = prefix + '.jsp?q=' + Base64.encode(this.href);
        this.target = '_self';
    });
    
    $('#q').click(function(){
        if(this.defaultValue == this.value) $(this).val('').removeClass('passive');
    }).blur(function(){
        if ('' == this.value) $(this).val(this.defaultValue).addClass('passive');
    }).addClass('passive').parent().parent().submit(function(){
        var q = $('#q').val();
        if (/^[-a-z0-9.]+$/i.test(q)) location.href = SITE_URL + 'index.jsp?q=' + Base64.encode('http://domainsbyip.com/#' + q);
        else alert('Incorrect query!');
        return false;
    });
    
});
