fileops = require '../lib/fileops'

content = fileops.readFileSync "/sys/class/net/lo/operstate"
console.log content
content = fileops.readdirSync "/sys/class/net/lo"
console.log content

res = fileops.fileExistsSync "/config/shorewall/group/shorewall.conf"
res = fileops.linkSync "/config/shorewall/group/shorewall.conf", "/etc/shorewall/shorewall.conf", 1
