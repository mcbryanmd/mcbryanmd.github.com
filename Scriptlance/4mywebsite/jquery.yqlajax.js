jQuery.ajax = (function(_ajax){

    var protocol = location.protocol,
        hostname = location.hostname,
        exRegex = RegExp(protocol + '//' + hostname),
        YQL = 'http' + (/^https/.test(protocol)?'s':'') + '://query.yahooapis.com/v1/public/yql?format=json&callback=?',
        query = "select {SELECT} from {SEARCHTYPE} where query='{QUERY}'";
		
    return function(o) {
        
        if ( /get/i.test(o.type) && !/json/i.test(o.dataType)) {
            
            // Manipulate options so that JSONP-x request is made to YQL
            
            o.url = YQL;
            o.dataType = 'json';
            var querysx = query.replace("{SELECT}",o.select).replace("{SEARCHTYPE}",o.searchtype).replace("{QUERY}",o.query);
            o.data = {
                q: querysx,
                format: 'json'
            };
            
            // Since it's a JSONP request
            // complete === success
            if (!o.success && o.complete) {
                o.success = o.complete;
                delete o.complete;
            }
            
            o.success = (function(_success){
                return function(data) {
                    alert("test:"+data);
					alert("test:"+data.results);
					alert("test:"+data.results.join(","));
					alert("test:"+data.results.Result.join(","));
                    if (_success) {
                        // Fake XHR callback.
                        _success.call(this, {
                            responseText: data.results.Result.join(" ")
                        }, 'success');
                    }
                    
                };
            })(o.success);
            
        }
        
        return _ajax.apply(this, arguments);
        
    };
    
})(jQuery.ajax);
