using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RepairsData.RepairsContext;
using RepairsWeb.Data.Interfaces;
using RepairsWeb.Data.Repositories;
using RepairsWeb.Entities;
using RepairsWeb.GraphQL;
using RepairsWeb.MailSender;

namespace RepairsWeb
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            //services.AddCors();

            services.AddDistributedMemoryCache();
            services.AddSession();
            services.Configure<SmtpSettings>(Configuration.GetSection("SmtpSettings"));
            services.Configure<RepairsSettings>(Configuration.GetSection("RepairsSettings"));
            services.AddAuthentication(IISDefaults.AuthenticationScheme);
            services.Configure<IISOptions>(p =>
            {
                p.AutomaticAuthentication = true;
                p.ForwardClientCertificate = true;
            });

            services.AddSwaggerGen();

            //services.AddGraphQLServer().AddQueryType<RepairsQuery>().AddProjections()
            //        .AddFiltering()
            //        .AddSorting()
            //        .AddAuthorization();

            //services.AddPooledDbContextFactory<RepairsContext>(p => p.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddDbContext<RepairsContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));
            services.AddControllersWithViews().AddNewtonsoftJson(options => options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddScoped<IRefillings, RefillingsRepository>();
            services.AddScoped<IRepairs, RepairsRepository>();
            services.AddScoped<ICommon, CommonRepository>();
            services.AddScoped<IFilterSettings, FilterSettingsRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IMailService, MailServiceRepository>();
            services.AddScoped<IRoleProvider, RoleProviderRepository>();
            services.AddScoped<IDirectory, DirectoryRepository>();
            services.AddScoped<ILimits, LimitsRepository>();
            services.AddScoped<IReports, Reports>();
            services.AddScoped<IMailSender, RepairsWeb.MailSender.MailSender>();
            services.AddScoped<IMoney, MoneyRepository>();

            services.AddHttpContextAccessor();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "repairs-web/build";
            });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            //app.UseCors(p => p.AllowAnyMethod().AllowAnyHeader().AllowAnyOrigin());

            app.UseAuthentication();

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseSwagger();

            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "RepairsTPlus API V1"));

            app.UseRouting();

            app.UseAuthorization();

            app.UseSession();

            app.UseEndpoints(endpoints =>
            {
                //endpoints.MapGraphQL("/graphql");
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "repairs-web";

                if (env.IsDevelopment())
                {
                    //spa.UseReactDevelopmentServer(npmScript: "start");
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000");
                }
            });
        }
    }
}