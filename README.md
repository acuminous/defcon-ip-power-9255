# DEFCON IP Power 9255 Plugin

The Aviosys IP Power 9255 is a main power switch you can control via http. This plugin sends the 9255 a sequence of on/off instructions when a specific event is received. This plugin probably works with the 4 socket IP Power 9258 too, but we haven't tested it. If you want to go nuts you can also send commands to multiple 9255s per event.

## Prerequisits
1. [DEFCON](http://github.com/acuminous/defcon)
1. [AVIOSYS IP Power 9255](http://www.aviosys.com/9255.html)

## Installation
1. ```cd $DEFCON_INSTALL_DIR```
2. ```npm install defcon-ip-power-9255```
3. Enable and configure 'defcon-ip-power-9255' in your DEFCON configuration file, e.g.
```json
{
    "plugins": {
        "installed": [
            "defcon-ip-power-9255"
        ],
        "defcon-ip-power-9255": {            
            "rules": [
                { 
                    "criteria": { "type": "build_failure" },
                    "sequence": [
                        {
                            "offset": 0,
                            "baseUrl": "http://ip9255a.acuminous.meh",  
                            "username": "admin",
                            "password": "12345678",                        
                            "outputs": [1], // You can specify multiple sockets if you have a 9258
                            "state": "on"
                        },                        
                        {                                                    
                            "offset": 10,
                            "baseUrl": "http://ip9255a.acuminous.meh",                            
                            "username": "admin",
                            "password": "12345678",                            
                            "outputs": [1],
                            "state": "off"
                        }        
                    ]                    
                }
            ]
        }
    }
}
```
4. Restart defcon (you can do this via ```kill -s USRSIG2 <pid>``` if you want zero downtime)

## Configuration

The plugin configuration options are only host, port and protocol (which can be either 'udp4' or 'udp6'). A basic logstash configuration is as follows:-
```ruby
input { 
    udp {
        port => 9999
        codec => json
    }
}
output { 
    stdout {
        codec => json
    }
}
```
