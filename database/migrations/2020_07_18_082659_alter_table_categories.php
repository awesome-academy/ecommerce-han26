<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AlterTableCategories extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->tinyInteger('level');
            $table->unsignedBigInteger('parent_id')->nullable()->change();
            $table->renameColumn('name', 'en_name');
            $table->string('vi_name', 50);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('categories', function (Blueprint $table) {
            $table->dropColumn('level');
            $table->unsignedBigInteger('parent_id')->change();
            $table->renameColumn('en_name', 'name');
            $table->dropColumn('vi_name');
        });
    }
}
