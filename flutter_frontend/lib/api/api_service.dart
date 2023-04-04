import 'dart:convert';
import 'package:http/http.dart' as http;

import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_frontend/config.dart';
import 'package:flutter_frontend/models/category.dart';

// with help of riverpod get dependency injection for http client,etc
// it ll be created once and stay alive througout the lifecycle of the app.
// di for apiService (can be placed/accessed (from) anywhere)
final apiService = Provider((ref) => ApiService());

class ApiService {
  static var client = http.Client();

  Future<List<Category>?> getCategories(page, pageSize) async {
    Map<String, String> requestHeaders = {'Content-Type': 'application/json'};

    Map<String, String> queryString = {
      'page': page.toString(),
      'pageSize': pageSize.toString(),
    };

    var url = Uri.http(Config.apiUrl, Config.categoryAPI, queryString);

    var response = await client.get(url, headers: requestHeaders);

    if (response.statusCode == 200) {
      var body = jsonDecode(response.body);
      return categoriesFromJson(body['data']);
    } else {
      return null;
    }
  }
}
