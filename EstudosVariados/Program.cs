using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Net.Http;
using System.Text.Json;

// Ler arquivo de Configuração JSON

/*

using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;

...

Host.CreateDefaultBuilder().ConfigureAppConfiguration((hosting, configuration) => {
configuration.AddJsonFile("appsettings.json");
IConfigurationRoot root = configuration.Build();

text
string myName = root.GetSection("MyName").Value;
List<Course> myCourses = new List<Course>();
root.GetSection("MyCourses").Bind(myCourses);

}).Build();

*/

/*
// http request example

public class Course
{
    public string Name { get; set; }
    public int Rating { get; set; }
}
public class Rating
{
    public int Value { get; set; }
}

var course = new Course() { Name = ".NET Big Picture", Rating = 5 };

var client = new HttpClient();

var request = new HttpRequestMessage(HttpMethod.Post, "https://your-service.com/post");

request.Content = new StringContent(JsonSerializer.Serialize(course));

HttpResponseMessage response = await client.SendAsync(request);

var responseString = await response.Content.ReadAsStringAsync();

Rating courseRating = JsonSerializer.Deserialize<Rating>(responseString);
Console.WriteLine($"Course rating value: {courseRating.Value}");
*/


/*
//DESERIALIZAÇÃO / DESERIALIZAÇÃO

using System.Text.Json;

// double quote escaping not included
var serialized = "[{\"Name\": \".NET Big Picture\", \"Rating\":5},{\"Name\":\"AD B2C\", \"Rating\":5}]";

List<Course> courses = JsonSerialize.Deserialize<List<Course>>(serialized);

// courses is populated with 2 Course objects
public static class JsonSerialize
{
    public static T Deserialize<T>(string jsonString)
    {
        return JsonSerializer.Deserialize<T>(jsonString);
    }
}
*/

// SERIALIZAÇÃO

/*

var course1 = new Course() { Name = ".NET Big Picture", Rating = 5 }; 
var course2 = new Course() { Name = "AD B2C", Rating = 5 }; 
var courses = new List<Course>(new [] { course1, course2 });
var jsonString = System.Text.Json.JsonSerializer.Serialize(courses);

*/


// ASYNC / AWAIT EXAMPLE

/*
var desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);
var fileName = Path.Join(desktop, "readme.txt");
var contentToWrite = "Initial file contents";
var readContents = await WriteAndReadFile(fileName, contentToWrite);
Console.WriteLine(readContents); // outputs: Here's some new content

async Task<string> WriteAndReadFile(string filePathAndName, string contentToWrite)
{
    contentToWrite = "Here's some new content";

    await File.WriteAllTextAsync(filePathAndName, contentToWrite);

    var readContents = await File.ReadAllTextAsync(filePathAndName);

    return readContents; // returns "Here's some new content"
}

*/

// STREAM WRITING EXAMPLE

/*
var desktop = Environment.GetFolderPath(Environment.SpecialFolder.Desktop);

var directoryName = Path.Join(desktop, "test");

Directory.CreateDirectory(directoryName);

var directoryExists = Directory.Exists(directoryName);

Console.WriteLine(directoryExists); //outputs: True

var fileName = Path.Join(directoryName, "readme.txt");

File.WriteAllText(fileName, "Hello world");

var fileContents = File.ReadAllText(fileName);

Console.WriteLine(fileContents); //outputs: Hello world

var fileName = Path.Join(directoryName, "readme.txt");

var content = "Hello world";

var contentBytes = new System.Text.UTF8Encoding().GetBytes(content);

using var fileStream = File.Create(fileName);

fileStream.Write(content);
fileStream.Flush();

*/



/*
var directoryName = "test";

Directory.CreateDirectory(directoryName);

var directoryExists = Directory.Exists(directoryName);

Console.WriteLine(directoryExists); // outputs: True

var fileName = $"{directoryName}/readme.txt"; // macOS specific

File.WriteAllText(fileName, "Hello world");

var fileContents = File.ReadAllText(fileName);

Console.WriteLine(fileContents); // outputs: Hello world
*/


/*
// LINQ Example
var myCourses = new List<Course>();

myCourses.Add(new Course { Name = "Developing AD B2C Applications", Rating = 3 });
myCourses.Add(new Course { Name = "MSFT Azure Developer: Events", Rating = 5 });
myCourses.Add(new Course { Name = ".NET Classes The Big Picture", Rating = 6 });
var highRatedCourses = myCourses.Where(c => c.Rating >= 5);

foreach (var course in highRatedCourses)
{
// will only be 1 item - ".NET Classes Big Picture" course
Console.WriteLine(course.Name);
}

internal class Course
{
    public string Name { get; set; }
    public int Rating { get; set; }
}
*/

/*
var myCourses = new List<Course>();

myCourses.Add(new Course { Name = "Developing AD B2C Applications", Rating = 5 });
myCourses.Add(new Course { Name = "MSFT Azure Developer: Events", Rating = 5 });
myCourses.Add(new Course { Name = ".NET Classes The Big Picture", Rating = 6 });

foreach (var course in myCourses)
{
Console.WriteLine(course.Name); // outputs name of course
}

public class Course
{
    public string Name { get; set; }
    public int Rating { get; set; }
} */