#ifndef NODE_HELLO_H_
#define NODE_HELLO_H_
#include <v8.h>

namespace node {
    // 预定义方法
    v8::Handler<v8::value> SayHello(const v8::Arguments& args);
}

#endif