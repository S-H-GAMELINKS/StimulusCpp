#include <iostream>
#include <httplib.h>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

const std::string load_assets(const std::string& path) {

    std::ifstream file(path.c_str(), std::ios::in);

    std::stringstream stream;

    stream << file.rdbuf();

    file.close();

    std::string assets(stream.str());

    return assets;
}

int main() {

    httplib::Server svr;

    std::vector<std::string> chats;

    std::string body = load_assets("./assets/index.html");

    std::string indexjs = load_assets("./assets/index.js");

    svr.Get("/", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(body, "text/html");
    });

    svr.Get("/messages", [&](const httplib::Request& req, httplib::Response& res) {

        std::ostringstream chat;

        for(auto&& c : chats)
            chat << "<p>" << c.c_str() << "</p>";

        res.set_content(chat.str(), "text/plain");
    });

    svr.Post("/messages", [&](const httplib::Request& req, httplib::Response& res) { 

        chats.emplace_back(std::move(req.body));

        res.set_content(std::to_string(req.get_param_value_count("chat")), "text/html");
    });

    svr.Get("/index.js", [&](const httplib::Request& req, httplib::Response& res) {
        res.set_content(indexjs, "text/javascript");
    });

    svr.listen("localhost", 3000);

    return 0;
}